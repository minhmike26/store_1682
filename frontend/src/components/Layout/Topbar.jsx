import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTiktokFill } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-red-500 text-white">
      <div className="container mx-auto flex justify-center items-center py-3 px-4 md:grid md:grid-cols-3">
        <div className="hidden md:flex items-center space-x-4">
          <TbBrandMeta className="h-5 w-5" />
          <IoLogoInstagram className="h-5 w-5" />
          <RiTiktokFill className="h-4 w-5" />
        </div>
        <div className="text-sm text-center">
          <span>We Ship Fast and Reliable - Order Now!</span>
        </div>
        <div className="text-sm text-right hidden md:block">
          <a href="tel:84905948567" className="hover:text-gray-300">
            (+84) 905 948 567
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
