import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  message: {
    require: true,
    type: String,
  },
  userId: {
    require: true,
    type: String,
  },
  serviceId: {
    require: true,
    type: String,
  },
  progressing: {
    type: Object,
    default: {
      progress: "pending",
      date: null,
      message: "",
    },
  },
});

const Offer = mongoose.model("offer", offerSchema);

export default Offer;
