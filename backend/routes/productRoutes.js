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
      user: req.user._id, //referencing the admin who created the product
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
