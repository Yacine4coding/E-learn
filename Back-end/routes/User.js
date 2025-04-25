import express from "express";
import {
  getTeacherDashboard,
  getUserDashboard,
  googleFaild,
  updateProfileImage,
  updateUserInfo,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";



const user = express.Router();

user.get("/dashboard", verifyToken, getUserDashboard, getTeacherDashboard);
user.put("/", verifyToken, updateUserInfo);
user.put(
  "/profileImage",
  verifyToken,
  upload.single("profileImage"),
  updateProfileImage
);
user.get("/login/failed", googleFaild);

export default user;
