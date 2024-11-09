import mongoose from "mongoose";

const teacherShcema = mongoose.Schema({
  domain: {
    type: String,
    default: "none",
  },
  courses: {
    type: {
      count: Number,
      coursesId: [],
    },
    default: {
      count: 0,
      coursesId: [],
    },
  },
});
const Teacher = mongoose.model("teacher", teacherShcema);
export default Teacher;
