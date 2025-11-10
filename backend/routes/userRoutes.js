const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Registration logic
    // tìm user trong database bằng email
    let user = await User.findOne({ email });
    // nếu user đã tồn tại thì trả về lỗi
    if (user) return res.status(400).json({ message: "User already exists" });
    // tạo user mới
    user = await User.create({ name, email, password });
    // lưu user vào database
    await user.save();

    // Tạo JWT token
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    // Sign và Return về token cùng với dữ liệu user
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        // Gửi thông tin user và token trong response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm user trong database bằng email
    let user = await User.findOne({ email });
    // Nếu user không tồn tại thì trả về lỗi
    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password" });
    // So sánh password nhập vào với password trong database bằng bcrypt
    const isMatch = await user.matchPassword(password);
    // Nếu password không khớp thì trả về lỗi
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Email or Password" });
    // Tạo JWT token
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    // Sign và Return về token cùng với dữ liệu user
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        // Gửi thông tin user và token trong response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/users/profile
// @desc Get logged in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
