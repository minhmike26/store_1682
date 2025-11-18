const express = require("express");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
// @desc Tạo checkout session mới
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    // Kiểm tra có sản phẩm trong checkout không
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    // Tạo checkout session mới với trạng thái thanh toán ban đầu
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/checkout/:id/pay
// @desc Cập nhật checkout để đánh dấu đã thanh toán sau khi thanh toán thành công
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    // Tìm checkout theo ID
    const checkout = await Checkout.findById(req.params.id);
    // Kiểm tra checkout có tồn tại không
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    // Kiểm tra trạng thái thanh toán có phải "Paid" không
    if (paymentStatus === "Paid") {
      // Nếu thanh toán thành công, cập nhật thông tin
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paidAt = Date.now();
      await checkout.save(); // Lưu checkout session
      res.status(200).json(checkout); // Trả về checkout session
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/checkout/:id/finalize
// @desc Hoàn tất checkout và chuyển đổi thành đơn hàng sau khi xác nhận thanh toán
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    // Tìm checkout theo ID
    const checkout = await Checkout.findById(req.params.id);

    // Kiểm tra checkout có tồn tại không
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    // Kiểm tra checkout đã được thanh toán và chưa được finalize
    if (checkout.isPaid && !checkout.isFinalized) {
      // Tạo đơn hàng cuối cùng dựa trên thông tin checkout
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Đánh dấu checkout đã được finalize
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save(); // Lưu checkout session
      // Xóa giỏ hàng của user sau khi đã tạo đơn hàng
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder); // Trả về đơn hàng cuối cùng
    } else if (checkout.isFinalized) {
      // Checkout đã được finalize rồi
      return res.status(400).json({ message: "Checkout is already finalized" });
    } else {
      // Checkout chưa được thanh toán
      return res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
