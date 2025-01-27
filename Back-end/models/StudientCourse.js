import mongoose from "mongoose";

const studientCourse = new mongoose.Schema(
  {
    courseId: { type: String, require: true },
    studentId: { type: String, require: true },
    chapterNumber: { type: Number, default: 0 },
    for100: { type: Number, default: 0 },
    quiz: { type: Object, default: {} },
  },
  { timestamps: true }
);

const StudientCourse = mongoose.model("studientCourse", studientCourse);
export default StudientCourse;
