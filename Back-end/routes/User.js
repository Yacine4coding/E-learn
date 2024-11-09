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
user.post("/signup", singup);
user.post("/login", login);
// user.get("/logout", logOut);
user.get("/isLoggin", isLoggin);
user.get("/login/failed", googleFaild);
user.get("/logout", googleLogOut);
user.delete("/", verifyToken, deleteAccount);
export default user;
