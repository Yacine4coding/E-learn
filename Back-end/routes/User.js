import express from "express";
import {
  deleteAccount,
  googleFaild,
  googleLogOut,
  isLoggin,
  login,
  logout,
  singup,
  updateUserInfo,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";
const user = express.Router();

user.post("/signup", singup);
user.post("/login", login);
user.get("/isLoggin", isLoggin);
user.get("/logout", logout);
user.put("/", verifyToken, updateUserInfo);
user.delete("/", verifyToken, deleteAccount);
user.get("/login/failed", googleFaild);
user.get("/logout", googleLogOut);

export default user;
