import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturesSection from "../components/Products/FeaturesSection";
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection/>
      <NewArrivals/>
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails/>
      <FeaturesSection/>
    </div>
  );
};

export default Home;
