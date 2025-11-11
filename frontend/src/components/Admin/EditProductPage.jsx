import React from "react";
import { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    SKU: "",
    category: "",
    brand: "",
    flavour: [],
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="SKU"
            value={productData.SKU}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            placeholder="Enter product SKU"
            required
          />
        </div>
        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                category: e.target.value,
              }))
            }
            className="w-full border p-2 border-gray-300 rounded-md"
            required
          >
            <option value="Protein">Protein</option>
            <option value="Pre-Workout">Pre-Workout</option>
            <option value="Creatine">Creatine</option>
            <option value="Vitamins">Vitamins</option>
          </select>
        </div>
        {/* Brand */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border p-2 border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Flavour */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Flavour</label>
          <select
            name="flavour"
            value={
              Array.isArray(productData.flavour)
                ? productData.flavour[0] || ""
                : productData.flavour
            }
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                flavour: e.target.value ? [e.target.value] : [],
              }))
            }
            className="w-full border p-2 border-gray-300 rounded-md"
            required
          >
            <option value="Chocolate">Chocolate</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Strawberry">Strawberry</option>
          </select>
        </div>
        {/* Images */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Images</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border p-2 border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transistion-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
export default EditProductPage;
