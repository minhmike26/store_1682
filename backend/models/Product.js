const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price must be positive"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock count cannot be negative"],
    },
    SKU: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Protein", "Pre-Workout", "Creatine", "Vitamins"],
    },
    brand: {
      type: String,
      required: true,
      enum: [
        "MusclePharm",
        "Optimum Nutrition",
        "Cellucor",
        "MyProtein",
        "Rule One",
      ],
    },
    flavour: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          const allowedFlavours = ["Chocolate", "Vanilla", "Strawberry"];
          return v.every((flavour) => allowedFlavours.includes(flavour));
        },
        message: "Flavour must be one of: Chocolate, Vanilla, Strawberry",
      },
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          altText: {
            type: String,
            default: "",
          },
        },
      ],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: [String],
    },
    weight: {
      type: Number,
      min: [0, "Weight must be positive"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
