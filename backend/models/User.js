const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema định dạng dữ liệu cho user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // regex để kiểm tra email hợp lệ
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
); // timestamps: true để lưu thời gian tạo và cập nhật

// Hash Password Middleware để hash password trước khi lưu vào database bằng bcrypt
// userSchema.pre là pre-hook middleware của Mongoose, chạy trước khi thực hiện một thao tác (ví dụ: save, find, remove).
userSchema.pre("save", async function (next) {
  // chạy trước khi lưu user vào database
  if (!this.isModified("password")) {
    return next(); // nếu password không được modify thì không hash password
  }
  const salt = await bcrypt.genSalt(10); // tạo salt bằng bcrypt
  this.password = await bcrypt.hash(this.password, salt); // hash password bằng bcrypt
  next(); // chạy tiếp middleware tiếp theo
});

// so sánh password nhập vào với password trong database bằng bcrypt
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User; // export User Model để sử dụng trong các file khác
