const express = require("express");
const Order = require("../models/Order");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private/Admin
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/admin/orders/:id
// @desc Get order by ID
// @access Private/Admin
router.get("/:id", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "name email");
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order
// @access Private/Admin
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id); // find order by id
    // if order exists, update order
    if (order) {
      order.status = req.body.status || order.status; // update order status
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered; // update order delivered status
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt; // update order delivered at
      const updatedOrder = await order.save(); // save updated order
      res.json(updatedOrder); // return updated order
    } else {
      res.status(404).json({ message: "Order not found" }); // return not found message
    }
  } catch (error) {
    console.error(error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete order
// @access Private/Admin
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id); // find order by id
    // if order exists, delete order
    if (order) {
      await order.deleteOne(); // delete order
      res.json({ message: "Order deleted successfully" }); // return success message
    } else {
      res.status(404).json({ message: "Order not found" }); // return not found message
    }
  } catch (error) {
    console.error(error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
});

module.exports = router;
