import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
