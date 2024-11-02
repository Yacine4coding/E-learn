import express from "express";
import { login, singup } from "../controller/user.js";

const user = express.Router();

user.post("/signup", singup);
user.post("/login", login);
// user.post("/auth/gsingup",googleSingup);
// user.post("/auht/glogin",googleLogin);
// user.get("/getuser",getuser);

export default user;
