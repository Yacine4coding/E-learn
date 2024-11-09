import express from "express";
import {
  deleteAccount,
  googleAuth,
  googleFaild,
  googleLogOut,
  isLoggin,
  login,
  logOut,
  singup,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";

const user = express.Router();

user.post("/signup", singup);
user.post("/login", login);
// user.get("/logout", logOut);
user.get("/isLoggin", isLoggin);
user.delete("/", verifyToken, deleteAccount);

user.get("/login/success", googleAuth);
user.get("/login/failed", googleFaild);
user.get("/logout", googleLogOut);
export default user;
