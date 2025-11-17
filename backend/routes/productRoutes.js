const express = require("express");
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new product
// @access Private/Admin
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      flavour,
      images,
      isFeatured,
      isPublished,
      tags,
      weight,
      SKU,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      flavour,
      images,
      isFeatured,
      isPublished,
      tags,
      weight,
      SKU,
      user: req.user._id, //Referencing the admin who created the product
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/products/:id
// @desc Update a product
// @access Private/Admin
router.put("/:id", protect, isAdmin, async (req, res) => {
  // Xử lý cập nhật sản phẩm
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      flavour,
      images,
      isFeatured,
      isPublished,
      tags,
      weight,
      SKU,
    } = req.body;
    // Tìm sản phẩm theo id
    const product = await Product.findById(req.params.id);
    // Cập nhật sản phẩm nếu tồn tại
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.flavour = flavour || product.flavour;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.weight = weight || product.weight;
      product.SKU = SKU || product.SKU;
      // Lưu sản phẩm
      const updatedProduct = await product.save();
      res.json(updatedProduct);
      // Nếu sản phẩm không tồn tại, trả về lỗi 404
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    // Tìm sản phẩm theo id
    const product = await Product.findById(req.params.id);
    // Nếu sản phẩm tồn tại thì xóa
    if (product) {
      await product.deleteOne();
      // Trả về thông báo thành công
      res.json({ message: "Product deleted successfully" });
      // Nếu sản phẩm không tồn tại, trả về lỗi 404
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all products with filtering, searching, sorting, and pagination
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      flavour,
      minPrice,
      maxPrice,
      sortBy,
      search,
      limit,
      page,
    } = req.query;

    let query = { isPublished: true }; // Chỉ hiển thị sản phẩm đã được publish

    // Lọc theo danh mục
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    // Lọc theo thương hiệu (có thể chọn nhiều brand)
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    // Lọc theo hương vị (có thể chọn nhiều hương vị)
    if (flavour) {
      query.flavour = { $in: flavour.split(",") };
    }

    // Lọc theo khoảng giá (minPrice hoặc maxPrice)
    if (minPrice || maxPrice) {
      //Nếu có minPrice hoặc maxPrice thì lọc theo khoảng giá
      query.price = {};
      if (minPrice) {
        //Nếu có minPrice thì lọc theo khoảng giá lớn hơn hoặc bằng minPrice
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        //Nếu có maxPrice thì lọc theo khoảng giá nhỏ hơn hoặc bằng maxPrice
        query.price.$lte = Number(maxPrice);
      }
    }

    // Tìm kiếm trong tên và mô tả
    if (search) {
      //Nếu có search thì tìm kiếm trong tên và mô tả
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Xây dựng đối tượng sắp xếp
    let sort = {};
    if (sortBy) {
      //Nếu có sortBy thì sắp xếp theo sortBy
      switch (sortBy) {
        case "priceAsc": //Sắp xếp theo giá tăng dần (Price: Low to High)
          sort = { price: 1 };
          break;
        case "priceDesc": //Sắp xếp theo giá giảm dần (Price: High to Low)
          sort = { price: -1 };
          break;
        case "popularity": //Sắp xếp theo độ phổ biến (dựa trên ratings và numReviews)
          sort = { ratings: -1, numReviews: -1 };
          break;
        default:
          break;
      }
    }
    //Lấy sản phẩm theo query, sắp xết theo sort, giới hạn số lượng sản phẩm theo limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/best-seller
// @desc Get best seller product with highest ratings
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    //Lấy sản phẩm bán chạy nhất
    const bestSeller = await Product.findOne({ isPublished: true }).sort({
      ratings: -1,
      numReviews: -1,
    });
    //Nếu sản phẩm bán chạy nhất tồn tại, trả về sản phẩm
    if (bestSeller) {
      //Trả về sản phẩm bán chạy nhất
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "Best seller product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc Get latest 8 products theo createdAt mới nhất
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    // Lấy 8 sản phẩm mới nhất
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/:id
// @desc Get a product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    //Tìm sản phẩm theo id
    const product = await Product.findById(req.params.id);
    if (product) {
      //Nếu sản phẩm tồn tại, trả về sản phẩm
      res.json(product);
    } else {
      //Nếu sản phẩm không tồn tại, trả về lỗi 404
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Get similar products by based on current product's category and brand
// @access Public

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Tìm sản phẩm theo id
    const product = await Product.findById(id);
    //Nếu sản phẩm tồn tại, trả về sản phẩm
    if (!product) {
      //Nếu sản phẩm không tồn tại, trả về lỗi 404
      return res.status(404).json({ message: "Product not found" });
    }
    //Lấy sản phẩm tương tự theo danh mục và thương hiệu
    const similarProducts = await Product.find({
      _id: { $ne: id }, //Không lấy sản phẩm hiện tại
      category: product.category, //Lấy sản phẩm có cùng danh mục
      brand: product.brand, //Lấy sản phẩm có cùng thương hiệu
    }).limit(4); //Lấy 4 sản phẩm tương tự
    res.json(similarProducts); //Trả về sản phẩm tương tự
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
