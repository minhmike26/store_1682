import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Quick Actions Overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col space-y-2">
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                  <HiOutlineHeart className="h-4 w-4 text-gray-600" />
                </button>
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                  <HiOutlineShoppingBag className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Sale Badge (if applicable) */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Sale
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <Link to={`/product/${product._id}`} className="block">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-gray-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex items-center space-x-2 mb-2">
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              <span className="text-xl font-bold text-gray-800">
                ${product.price}
              </span>
            </div>

            {/* Product Rating (placeholder) */}
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(4.5)</span>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Empty State */}
      {products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
