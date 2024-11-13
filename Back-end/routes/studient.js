import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { changePoint } from "../controller/studient.js";

const studient = express.Router();

studient.put("/changePoint/userId", verifyToken, changePoint);

export default studient;
