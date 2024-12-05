import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addCourse,
  bestCourses,
  getPersonellCourses,
  getTeacherCourses,
  updateCourses,
} from "../controller/courses.js";
import { enableTeacher } from "../middleware/teacher.js";
const courses = express.Router();

courses.post("/", verifyToken, enableTeacher, addCourse);
courses.get("/", verifyToken, enableTeacher, getPersonellCourses);
courses.get("/:teacherId", verifyToken, getTeacherCourses);
courses.get("/bestCourses/:count",bestCourses);

/** */
courses.put("/:courseId", verifyToken, enableTeacher, updateCourses);
export default courses;
// todo: update course
// todo: delete course by id
// todo: delete course by teacherId
// todo: delete post by user id
// todo: hundle notifications
// todo: hundle reply in comment
