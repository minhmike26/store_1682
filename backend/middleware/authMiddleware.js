const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware để bảo vệ các route
const protect = async (req, res, next) => {
  // Lấy token từ header
  let token;
  // Nếu có token trong header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header và loại bỏ "Bearer"
      token = req.headers.authorization.split(" ")[1];
      // Xác thực token được gửi từ frontend bằng JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Nếu token hợp lệ thì lấy user từ database bằng _id trong token và loại bỏ password
      req.user = await User.findById(decoded.user._id).select("-password");
      // Chạy middleware tiếp theo
      next();
    } catch (error) {
      console.error("Token is not valid", error);
      res.status(401).json({ message: "Unauthorized, Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized, No Token Provided" });
  }
};

// Middleware kiểm tra xem user có phải là admin không
const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden, You are not authorized to access this resource",
    });
  }
  next();
};

module.exports = { protect, isAdmin };