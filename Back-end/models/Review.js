import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  studentId: {
    type: String,
    require: true,
  },
  courseId: {
    type: String,
    require: true,
  },
  star: {
    type: Number,
    default: -1,
  },
  message: {
    type: String,
    default: "",
  },
});

const Review = mongoose.model("review", reviewSchema);
export default Review;
