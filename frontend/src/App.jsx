import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
//App.jsx - Component chính của ứng dụng
//Logic: Đây là component gốc của ứng dụng, sử dụng React Router để:
//Tạo routing system với BrowserRouter
//Định nghĩa route chính "/" sử dụng UserLayout làm wrapper
//Route con "index" sẽ hiển thị component Home
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
        </Route>
        <Route>{/*Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
