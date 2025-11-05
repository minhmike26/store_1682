import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductManagement = () => {
  const products = [
    {
      _id: "1",
      name: "Whey",
      price: 15,
      SKU: "1234567890",
    },
    {
      _id: "2",
      name: "Protein",
      price: 35,
      SKU: "1234567890",
    },
    {
      _id: "3",
      name: "Creatine",
      price: 45,
      SKU: "1234567890",
    },
  ];
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log({ "delete product": id });
      toast.success("Product deleted successfully");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Product List</h3>
        <table className="w-full text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.SKU}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
