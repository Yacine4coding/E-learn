import mongoose from "mongoose";

const coursesShcema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Object,
    default: {
      usersId: [],
      count: Number,
    },
  },
  review: {
    type: Object,
    default: {
      usersId: [],
      count: Number,
    },
  },
  payCount: {
    type: Number,
    default: 0,
  },
  buyCount: {
    type: Number,
    default: 0,
  },
  teacherId: {
    type: String,
    require: true,
  },
  chapterNumber: {
    type: Number,
    min: 1,
    require: true,
  },
  chapters: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
    require: true,
  },
});
const Courses = mongoose.model("course", coursesShcema);
export default Courses;
