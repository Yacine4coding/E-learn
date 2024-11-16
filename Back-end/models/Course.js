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
  ammount: {
    type: Number,
    default: "",
  },
  payCount: {
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
});
const Courses = mongoose.model("course", coursesShcema);
export default Courses;
