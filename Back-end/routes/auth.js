import express from "express";
import { isLoggin, login, logout, singup } from "../controller/auth.js";

const router = express.Router();

router.post("/signup", singup);
router.post("/login", login);
router.get("/isLoggin", isLoggin);
router.get("/logout", logout);

export default router;
