const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

// load environment variables
dotenv.config();

// kết nối database
mongoose.connect(process.env.MONGO_URI);

// tạo dữ liệu mẫu
const seedData = async () => {
  try {
    // xóa dữ liệu cũ
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();	
    // tạo default user admin
    const createdUsers = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    // gán user ID cho từng sản phẩm
    const userID = createdUsers._id;
    // tạo sản phẩm mẫu với user ID
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });
    // thêm sản phẩm mẫu vào database
    await Product.insertMany(sampleProducts);
    // log thông tin
    console.log("Products seeded successfully");
    // thoát khỏi chương trình
    process.exit();
  } catch (error) {
    console.error("Error seeding data", error);
    process.exit(1); // thoát khỏi chương trình với mã lỗi 1
  }
};
// chạy hàm seedData
seedData();
