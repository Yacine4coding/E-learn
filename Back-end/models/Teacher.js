import mongoose from "mongoose";

const teacherShcema = mongoose.Schema({
  domain: {
    type: String,
    default: "none",
  },
});
const Teacher = mongoose.model("teacher", teacherShcema);
export default Teacher;
