import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const FilterSidebar = () => {
  //searchParams: Lưu trữ các tham số tìm kiếm
  //setSearchParams: Cập nhật các tham số tìm kiếm
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  //filters: Lưu trữ các tham số filter
  const [filters, setFilters] = useState({
    category: [],
    flavour: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  //priceRange: Giá trị từ 0 đến 1000
  const [priceRange, setPriceRange] = useState([0, 1000]);

  //categories: Danh sách các loại sản phẩm
  const categories = ["Protein", "Pre-Workout", "Creatine", "Vitamins"];

  //flavours: Danh sách các loại vị
  const flavours = ["Chocolate", "Vanilla", "Strawberry"];

  //brands: Danh sách các loại thương hiệu
  const brands = [
    "MusclePharm",
    "Optimum Nutrition",
    "Cellucor",
    "MyProtein",
    "Rule One",
  ];
  //useEffect: Xử lý sự kiện thay đổi searchParams
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]); //Lấy các tham số từ searchParams và chuyển thành đối tượng
    //Cập nhật các tham số filter
    setFilters({
      category: params.category ? params.category.split(",") : [],
      flavour: params.flavour ? params.flavour.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]); //Phụ thuộc vào searchParams

  //handleFilterChange: Xử lý sự kiện thay đổi filter
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    //newFilters: Lưu trữ các tham số filter
    let newFilters = { ...filters };
    //Nếu kiểu là checkbox
    if (type === "checkbox") {
      //Nếu được chọn
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        //Nếu không được chọn
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      //Nếu kiểu khác checkbox
      newFilters[name] = value;
    }
    //Cập nhật các tham số filter
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  //updateURLParams: Cập nhật các tham số tìm kiếm
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params); //Cập nhật các tham số tìm kiếm
    navigate(`?${params.toString()}`); //Chuyển hướng đến trang mới với các tham số tìm kiếm
  };

  //handlePriceChange: Xử lý sự kiện thay đổi giá
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, maxPrice: newPrice };
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="text-gray-700 block mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category.includes(category)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/* Flavour */}
      <div className="mb-6">
        <label className="text-gray-700 block mb-2">Flavour</label>
        {flavours.map((flavour) => (
          <div key={flavour} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="flavour"
              value={flavour}
              onChange={handleFilterChange}
              checked={filters.flavour.includes(flavour)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{flavour}</span>
          </div>
        ))}
      </div>
      {/* Brand */}
      <div className="mb-6">
        <label className="text-gray-700 block mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
      {/* Price */}
      <div className="mb-8">
        <label className="text-gray-600 font-medium block mb-2">Price</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          onChange={handlePriceChange}
          value={priceRange[1]}
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
