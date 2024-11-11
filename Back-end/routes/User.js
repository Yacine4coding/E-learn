import express from "express";
import {
  deleteAccount,
  googleFaild,
  googleLogOut,
  isLoggin,
  login,
  singup,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";
const user = express.Router();
// * routes
// ? post
user.post("/signup", singup);
user.post("/login", login);
// ? get
user.get("/isLoggin", isLoggin);
// ? update

// ? delete
user.delete("/", verifyToken, deleteAccount);
// * google routes
user.get("/login/failed", googleFaild);
user.get("/logout", googleLogOut);
export default user;
