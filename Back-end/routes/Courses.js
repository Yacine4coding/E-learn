import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { addCourse, getPersonellCourses, getTeacherCourses, updateCourses } from "../controller/courses.js";
import { enableTeacher } from "../middleware/teacher.js";
const courses = express.Router();
/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Operations related to courses management (testing)
 */

/**
 * @swagger
 * /course/:teacherId:
 *   post:
 *     tags: [Course]
 *     summary: add courses route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - chapters
 *               - amount
 *             properties:
 *               title:
 *                 type: string
 *                 example: course kings indian defence
 *               description:
 *                 type: string
 *                 example: this course for learning king indian defence for beginners like you
 *               amount:
 *                 type: float
 *                 example: 299.99
 *               chapters:
 *                 type: array
 *                 example: array of chapter format (see chapret format from schemas)
 *     responses:
 *       201:
 *         description: create post successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user_teacher_0323
 *                 isHasPicture:
 *                   type: boolean
 *                   example: true
 *                 picture:
 *                   type: string
 *                   example: https://google.com/userPicture
 *                   description: the picture of user if he have it
 *                 courseId:
 *                   type: string
 *                   example: lkds34kdjsD30RC
 *                 description:
 *                   type: string
 *                   example: this for kink's endian defence
 *                 payCount:
 *                   type: number
 *                   example: 22.3
 *                 teacherId:
 *                   type: string
 *                   example: lkds34kdjsD30RC
 *                 chapterNumber:
 *                   type: number
 *                   example: 5
 *                 chapters:
 *                   type: Array
 *                   example: array of chapter format
 *       403:
 *         description: the user is not a theacher
 *       401:
 *         description: unAuth
 *       422:
 *         description: one of request body propertie is empty or chapterNumer is lower than 1
 *       500:
 *         description: internal server error
 */
courses.post("/", verifyToken, enableTeacher, addCourse);

/**
 * @swagger
 * /course:
 *   get:
 *     tags: [Course]
 *     summary: get personnel courses
 *     responses:
 *       200:
 *         description: result of req
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: Number
 *                   description: the number of courses
 *                   example: 123
 *                 courses:
 *                   type: Array
 *                   example: array of course format(see in schamas)
 *       204:
 *         description: no courses yet
 *       403:
 *         description: the user is not a theacher
 *       401:
 *         description: unAuth
 *       500:
 *         description: internal server error
 */
courses.get("/", verifyToken, enableTeacher, getPersonellCourses);

/**
 * @swagger
 * /course/:teacherId:
 *   get:
 *     tags: [Course]
 *     summary: get teacher courses by user name
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: the unique id of teacher who want to get his courses
 *         example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: the courses of the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: Number
 *                   description: the number of courese
 *                   example: 5
 *                 courses:
 *                   type: Array
 *                   description: array of courses format
 *                   example: array of courses format
 *       204:
 *         description: the teacher don't have a coureses yet
 *       400:
 *         description: the id in parameter isn't of teacher
 *       404:
 *         description: teacher not found
 *       401:
 *         description: unauth
 *       422:
 *         description: teacher id is empty
 *       500:
 *         description: internal server error

 */
courses.get("/:teacherId", verifyToken, getTeacherCourses);
// ! no testing
/** */
courses.put("/:courseId", verifyToken,enableTeacher,updateCourses);
export default courses;
// todo: update course
// todo: delete course by id
// todo: delete course by teacherId
// todo: delete post by user id
// todo: hundle notifications
// todo: hundle reply in comment