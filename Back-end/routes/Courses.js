import express from "express";
import { getUserFromToken, verifyToken } from "../middleware/jwt.js";
import {
  addCourse,
  bestCourses,
  favoriteCourses,
  getCourse,
  getPersonellCourses,
  getTeacherCourses,
  updateCourses,
  wishlistCourses,searchCourses,
  submitQuize,
  getCourseProgress
} from "../controller/courses.js";
import { enableTeacher } from "../middleware/teacher.js";
import upload from "../middleware/multer.js";
const courses = express.Router();

courses.post(
  "/",
  verifyToken,
  enableTeacher,
  upload.array("uploadsFile",10),
  addCourse
);
courses.get("/bestCourses/:count", bestCourses);
courses.get("/:courseId",getUserFromToken ,getCourse)
courses.get("/search/:value",searchCourses);
courses.get("/progress/:courseId", verifyToken, getCourseProgress);
courses.put("/favorite/:courseId",verifyToken , favoriteCourses);
courses.put("/submitquize",verifyToken , submitQuize)
courses.put("/wishlist/:courseId", verifyToken, wishlistCourses);
courses.put("/:courseId", verifyToken, enableTeacher, updateCourses);
export default courses;
