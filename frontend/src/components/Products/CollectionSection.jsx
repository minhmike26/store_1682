import React from "react";
import proteinImage from "../../assets/MenProtein.jpg";
import preworkoutImage from "../../assets/WomenProtein.jpg";
import { Link } from "react-router-dom";

const CollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={proteinImage}
            alt="Protein Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Protein Collection
            </h2>
            <Link to="/collections/protein" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={preworkoutImage}
            alt="Pre-Workout Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pre-Workout Collection
            </h2>
            <Link
              to="/collections/pre-workout"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
