import mongoose from "mongoose";

const teacherShcema = mongoose.Schema({
  domain: {
    type: String,
    default: "none",
  },
  notification: {
    type: Array,
    default: [],
  },
  courses: {
    type: {
      count: {
        type: Number,
        default: 0,
      },
      coursesId: {
        type: Array,
        default: [],
      },
    },
  },
});
const Teacher = mongoose.model("teacher", teacherShcema);
export default Teacher;
