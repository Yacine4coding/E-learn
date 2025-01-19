import express from "express";
import {
  deleteAccount,
  getTeacherDashboard,
  getUserDashboard,
  googleFaild,
  isLoggin,
  login,
  logout,
  singup,
  updateProfileImage,
  updateUserInfo,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";
import upload from "../middleware/multer.js";
const user = express.Router();

user.post("/signup", singup);
user.post("/login", login);
user.get("/isLoggin", isLoggin);
user.get("/logout", logout);
user.get("/dashboard",verifyToken,getUserDashboard,getTeacherDashboard);
user.put("/", verifyToken, updateUserInfo);
user.put("/profileImage" ,verifyToken, upload.single("profileImage"),updateProfileImage)
user.delete("/", verifyToken, deleteAccount);
user.get("/login/failed", googleFaild);

export default user;
