import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { changePoint, buyCourse } from "../controller/studient.js";
/**
 * @swagger
 * tags:
 *   name: Studient
 *   description: Operations related to studient management (testing)
 */
const studient = express.Router();

/**
 * @swagger
 * /studient/changePoint/:userId:
 *   put:
 *     tags: [Studient]
 *     summary: whange point of studient
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: get userId of studient
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - points
 *             properties:
 *               points:
 *                 type: number
 *                 description: number point you need to add
 *                 example: -12
 *     responses:
 *      200:
 *        description: update successfuly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                points:
 *                  type: number
 *                  example: 120
 *      401:
 *        description: unauth
 *      500:
 *        description: internal server error
 *      422:
 *        description: user id or point are empty
 *      404:
 *        description: studient not found
 *
 *
 *
 */
studient.put("/changePoint/:userId", verifyToken, changePoint);

studient.post("/:courseId", verifyToken, buyCourse);
export default studient;
