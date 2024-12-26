import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addCourse,
  bestCourses,
  courseById,
  favoriteCourses,
  getCourseById,
  getPersonellCourses,
  getTeacherCourses,
  updateCourses,
  wishlistCourses,
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
courses.put("/favorite/:courseId",verifyToken,favoriteCourses)
courses.get("/:teacherId", verifyToken, getTeacherCourses);
courses.put("/wishlist/:courseId",verifyToken,wishlistCourses)
courses.put("/:courseId", verifyToken, enableTeacher, updateCourses);
export default courses;
