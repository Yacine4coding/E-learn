import express from "express"
import {verifyToken} from "../middleware/jwt.js";
import { enableTeacher } from "../middleware/teacher.js";
import { getTeacherDashboard } from "../controller/teacher.js";
const teacher = express.Router();


teacher.get("/dashboard",verifyToken , enableTeacher , getTeacherDashboard);



export default teacher ; 