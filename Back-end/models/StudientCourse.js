import mongoose from "mongoose";

const studientCourse = new mongoose.Schema(
  {
    courseId: { type: String, required: true },
    studientId: { type: String, required: true },
    progress: {
      type: Object,
      default: {
        chapterNumber: 1,
        pusrsentage: 0,
      },
    },
  },
  { timestamps: true }
);

const StudientCourse = mongoose.model("studientCourse", studientCourse);
export default StudientCourse;
