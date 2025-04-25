import mongoose from "mongoose";

const marketPlaceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    budget: {
      type: Number,
      require: true,
    },
    offers: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const MarketPlace = mongoose.model("marktePlace", marketPlaceSchema);
export default MarketPlace;
