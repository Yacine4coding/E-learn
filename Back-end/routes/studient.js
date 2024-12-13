import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  changePoint,
  buyCourse,
  updateProgress,
  deleteStudientCourse,
} from "../controller/studient.js";
const studient = express.Router();
studient.put("/changePoint/:userId", verifyToken, changePoint);
studient.put("/updateProgress/:courseId", verifyToken, updateProgress);
studient.delete("/:courseId", verifyToken, deleteStudientCourse);
studient.post("/:courseId", verifyToken, buyCourse);
export default studient;
