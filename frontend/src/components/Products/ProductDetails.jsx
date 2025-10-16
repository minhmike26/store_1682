import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductRelated from "./ProductRelated";

const selectedProduct = {
  name: "Muscle pharm protein",
  price: 120,
  originalPrice: 150,
  description: "This is the best protein on the market",
  brand: "MusclePharm",
  category: "Protein",
  flavour: ["Strawberry", "Chocolate"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Muscle pharm 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Muscle pharm 2",
    },
  ],
};
const flavourColors = {
  Strawberry: "bg-pink-400",
  Chocolate: "bg-yellow-900",
  Vanilla: "bg-yellow-200",
};
const similarProducts = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Product 1",
      },
    ],
  },
  {
    _id: "2",
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Product 2",
      },
    ],
  },
  {
    _id: "3",
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Product 3",
      },
    ],
  },
  {
    _id: "4",
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Product 4",
      },
    ],
  },
];
const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(""); // Image chính
  const [selectedFlavour, setSelectedFlavour] = useState(""); // Flavour được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Trạng thái nút Add to Cart

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0]?.url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedFlavour) {
      toast.error("Please select a flavour before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart successfully.", { duration: 1000 });

      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              $ {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="mb-4">
              <span className="font-semibold">Brand:</span>{" "}
              <span className="text-gray-600">{selectedProduct.brand}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold">Category:</span>{" "}
              <span className="text-gray-600">{selectedProduct.category}</span>
            </p>
            <div className="mb-4">
              <p className="text-gray-700">Flavour:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.flavour.map((flavour) => (
                  <button
                    key={flavour}
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`px-4 py-2 rounded-full border text-sm text-white font-medium hover:opacity-80 transition 
                      ${flavourColors[flavour] || "bg-gray-300"} ${
                      selectedFlavour === flavour
                        ? "border-3 border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {flavour}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-gray-700 mt-4 mb-4">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                }`}
              >
                {" "}
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            Related Products
          </h2>
          <ProductRelated products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
