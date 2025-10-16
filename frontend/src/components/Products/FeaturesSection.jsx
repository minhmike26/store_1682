import React from "react";
import {
  HiShoppingBag,
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE SHIPPING</h4>
          <p className="text-gray-600 text-sm tracking-tighter">Any Order</p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">RETURN & REFUND</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Sealed and Unused Products within 30 Days
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% Secure Payment
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
