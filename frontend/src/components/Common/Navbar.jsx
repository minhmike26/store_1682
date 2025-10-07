import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
const Navbar = () => {
  return (
    <>
      <nav className="container mx-auto grid grid-cols-3 items-center py-4 px-4">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Minh
          </Link>
        </div>
        <div className="hidden md:flex justify-center space-x-5">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Pre-Workout
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Others
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer/> 
    </>
  );
};

export default Navbar;
