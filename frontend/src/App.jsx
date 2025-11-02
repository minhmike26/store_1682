import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

//App.jsx - Component chính của ứng dụng
//Logic: Đây là component gốc của ứng dụng, sử dụng React Router để:
//Tạo routing system với BrowserRouter
//Định nghĩa route chính "/" sử dụng UserLayout làm wrapper
//Route con "index" sẽ hiển thị component Home
//Route con "login" sẽ hiển thị component Login
//Route con "register" sẽ hiển thị component Register
//Route con "profile" sẽ hiển thị component Profile
//Route con "collections/:collection" sẽ hiển thị component CollectionPage
//Route con "products/:productId" sẽ hiển thị component ProductDetails
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
        </Route>
        <Route>{/*Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
