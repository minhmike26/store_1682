import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Component NewArrivals là một slider ngang để hiển thị các sản phẩm mới.
// dùng useRef để thao tác với thẻ scroll, và các useState để theo dõi trạng thái kéo, vị trí cuộn.
const NewArrivals = () => {
  // scrollRef: thẻ scroll
  const scrollRef = useRef(null);
  // isDragging: Trạng thái kéo thả
  const [isDragging, setIsDragging] = useState(false); // Trạng thái kéo thả
  // startX: Vị trí bắt đầu kéo
  const [startX, setStartX] = useState(0); // Vị trí bắt đầu kéro
  // scrollLeft: Vị trí scroll
  const [scrollLeft, setScrollLeft] = useState(false); // Vị trí scroll
  // canScrollRight: Trạng thái scroll right
  const [canScrollRight, setCanScrollRight] = useState(true); // Trạng thái scroll right
  // canScrollLeft: Trạng thái scroll left
  const [canScrollLeft, setCanScrollLeft] = useState(false); // Trạng thái scroll left
  // Danh sách sản phẩm mới
  const newArrivals = [
    {
      _id: "1",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Muscle pharm",
        },
      ],
    },
    {
      _id: "2",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Muscle pharm",
        },
      ],
    },
    {
      _id: "3",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Muscle pharm",
        },
      ],
    },
    {
      _id: "4",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Muscle pharm",
        },
      ],
    },
    {
      _id: "5",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Muscle pharm",
        },
      ],
    },
    {
      _id: "6",
      name: "Muscle pharm",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Muscle pharm",
        },
      ],
    },
  ];

  // Xử lý kéo thả
  const handleMouseDown = (e) => {
    setIsDragging(true); // Khi bắt đầu kéo
    setStartX(e.pageX - scrollRef.current.offsetLeft); // Vị trí bắt đầu kéo
    setScrollLeft(scrollRef.current.scrollLeft); // Vị trí scroll
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Nếu không kéo thì không làm gì
    const x = e.pageX - scrollRef.current.offsetLeft; // Vị trí kéo
    const walk = x - startX; // Khoảng cách kéo
    scrollRef.current.scrollLeft = scrollLeft - walk; // Vị trí scroll
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); // Kết thúc kéo thả
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300; // Xác định hướng và khoảng cách
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current; // Container scroll
    if (container) {
      const leftScroll = container.scrollLeft; // Vị trí scroll left
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth; // Trạng thái scroll right
      setCanScrollLeft(leftScroll > 0); // Có thể cuộn trái nếu scrollLeft > 0
      setCanScrollRight(rightScrollable); // Có thể cuộn phải nếu còn dư nội dung
    }
  };
  useEffect(() => {
    const container = scrollRef.current; // Container scroll
    if (container) {
      container.addEventListener("scroll", updateScrollButtons); // Thêm event scroll
      updateScrollButtons(); // Gọi lần đầu để cập nhật trạng thái nút
      return () => container.removeEventListener("scroll", updateScrollButtons); // Xóa event scroll khi component unmount
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest products designed to help you perform better,
          recover faster, and reach your fitness goals with confidence.
        </p>

        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } `}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } `}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
