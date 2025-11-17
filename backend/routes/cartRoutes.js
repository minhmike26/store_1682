const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Hàm helper để lấy cart theo guestId hoặc userId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, flavour, guestId, userId } = req.body;
  try {
    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    // Nếu sản phẩm không tồn tại, trả về lỗi
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Xác định cart là của guest hay user
    let cart = await getCart(userId, guestId);
    // Nếu cart đã tồn tại, cập nhật nó
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && p.flavour === flavour
      );
      if (productIndex > -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cart.products[productIndex].quantity += quantity;
      } else {
        // Thêm sản phẩm mới
        cart.products.push({
          productId,
          name: product.name,
          brand: product.brand,
          flavour,
          price: product.price,
          images: product.images[0].url,
          quantity,
        });
      }
      // Tính lại tổng giá
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Tạo cart mới cho guest hoặc user
      const newCart = await Cart.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            brand: product.brand,
            flavour,
            price: product.price,
            images: product.images[0].url,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/cart
// @desc Update the quantity of a product in the cart for a guest or logged in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, flavour, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    // Nếu cart không tồn tại, trả về lỗi
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    // Kiểm tra sản phẩm có tồn tại trong cart không
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.flavour === flavour
    );
    // Nếu sản phẩm tồn tại trong cart, cập nhật số lượng
    if (productIndex > -1) {
      // Cập nhật số lượng
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Xóa sản phẩm nếu số lượng là 0
      }
      // Tính lại tổng giá
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Nếu sản phẩm không tồn tại trong cart, trả về lỗi
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/cart
// @desc Delete a product from the cart for a guest or logged in user
// @access Public
router.delete("/", async (req, res) => {
  const { productId, flavour, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    // Nếu cart không tồn tại, trả về lỗi
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    // Kiểm tra sản phẩm có tồn tại trong cart không
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.flavour === flavour
    );
    // Nếu sản phẩm tồn tại trong cart, xóa nó
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      // Tính lại tổng giá
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Nếu sản phẩm không tồn tại trong cart, trả về lỗi
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/cart
// @desc Get logged in user's or guest's cart
// @access Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    let cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge a guest's cart with a logged in user's cart
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    // Tìm cart của guest và cart của user
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    // Nếu cart của guest tồn tại
    if (guestCart) {
      // Nếu cart của guest rỗng, trả về lỗi
      if (guestCart.products.length === 0) {
        return res.status(404).json({ message: "Guest cart is empty" });
      }

      // Nếu cart của user tồn tại
      if (userCart) {
        // Merge cart của guest với cart của user
        guestCart.products.forEach((guestItem) => {
          // Kiểm tra sản phẩm có tồn tại trong cart của user không
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.flavour === guestItem.flavour
          );

          // Nếu item tồn tại trong cart của user, cập nhật số lượng
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Ngược lại, thêm item của guest vào cart của user
            userCart.products.push(guestItem);
          }
        });

        // Tính lại tổng giá
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        // Lưu cart của user
        await userCart.save();
        // Xóa cart của guest sau khi đã merge
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.status(200).json(userCart);
      } else {
        // if user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
        if (userCart) {
            // Guest cart has already been merged with user cart, return the user cart
        return res.status(200).json(userCart);
        }
        res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
