import React from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";

//Tìm kiếm có 2 trạng thái:
// Đóng: Chỉ hiển thị icon search
// Mở: Hiển thị form tìm kiếm
const SearchBar = () => {
  //searchTerm: Từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  //isOpen: Trạng thái tìm kiếm mặc định là đóng
  const [isOpen, setIsOpen] = useState(false);
  //handleSearchToggle: Chuyển đổi trạng thái tìm kiếm (đóng/mở)
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  //handleSearch: Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit
    console.log("Search Term", searchTerm);
    setIsOpen(false); // tự động đóng form
  };
  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-24 z-50"
          : "flex items-center"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 "
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
