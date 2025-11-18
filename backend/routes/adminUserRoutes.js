const express = require("express");
const User = require("../models/User");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/admin/users
// @desc Create a new user
// @access Private/Admin
router.post("/", protect, isAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    user = new User({ name, email, password, role: role || "customer" });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/admin/users/:id
// @desc Update a user
// @access Private/Admin
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // find user by id
    // if user exists, update user
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save(); // save updated user
    res.json({ message: "User updated successfully", user: updatedUser }); // return updated user
  } catch (error) {
    console.error(error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
});

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // find user by id and delete
    if (user) {
      await user.deleteOne(); // delete user
      res.json({ message: "User deleted successfully" }); // return success message
    } else {
      res.status(404).json({ message: "User not found" }); // return not found message
    }
  } catch (error) {
    console.error(error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
});

module.exports = router;
