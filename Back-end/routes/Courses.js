import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addCourse,
  bestCourses,
  courseById,
  getCourseById,
  getPersonellCourses,
  getTeacherCourses,
  updateCourses,
} from "../controller/courses.js";
import { enableTeacher } from "../middleware/teacher.js";
import upload from "../middleware/multer.js";
const courses = express.Router();

courses.post(
  "/",
  verifyToken,
  enableTeacher,
  upload.single("picture"),
  addCourse
);
courses.get("/", verifyToken, enableTeacher, getPersonellCourses);
courses.get("/courseById",courseById)
courses.get("/bestCourses/:count", bestCourses);
courses.get("/:teacherId", verifyToken, getTeacherCourses);
courses.put("/:courseId", verifyToken, enableTeacher, updateCourses);
export default courses;
