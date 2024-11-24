import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { changePoint } from "../controller/studient.js";
/**
 * @swagger
 * tags:
 *   name: Studient
 *   description: Operations related to studient management (testing)
 */
const studient = express.Router();

studient.put("/changePoint/userId", verifyToken, changePoint);

export default studient;
