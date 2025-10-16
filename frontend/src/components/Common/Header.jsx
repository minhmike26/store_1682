import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";


// Header component 
// Kết hợp 2 component: Topbar và Navbar
const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div>
        <Topbar />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
