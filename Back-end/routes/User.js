import express from "express";
import {
  deleteAccount,
  googleFaild,
  googleLogOut,
  isLoggin,
  login,
  singup,
  updateUserInfo,
} from "../controller/user.js";
import { verifyToken } from "../middleware/jwt.js";
// * user api doc
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management
 */
/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags: [User]
 *     summary: normal sigup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: exemple@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *               isteacher:
 *                 type: boolean
 *                 remark: default value is false.
 *                 example: true
 *     responses:
 *       201:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       remark: his id in teacher/studien.
 *                       exemple: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: exemple
 *                     bio:
 *                       type: string
 *                       exemple: hi i'm user
 *                     notification:
 *                       type: Array
 *                       exemple: []
 *                       remark: check notification form
 *                     emailValidation:
 *                       type: boolean
 *                       remark: is email validate or not.
 *                     isteacher:
 *                       type: boolean
 *                       remark: is user teacher or not.
 *                     isHasPicture:
 *                       type: boolean
 *                       remark: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       remark: picture of his email in type link .
 *                       exemple : https://google.com/userid/picture
 *                     domain:
 *                       type: string
 *                       remark: this properties showed when user is teacher
 *                       exemple: web developper
 *                     points:
 *                       type: number
 *                       remark: this properties showed when user isn't teacher
 *                       exemple: 123
 *       422:
 *         description: all inputs is required
 *       409:
 *         description: email is already exist
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     summary: normal login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: exemple@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       remark: his id in teacher/studien.
 *                       exemple: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: exemple
 *                     bio:
 *                       type: string
 *                       exemple: hi i'm user
 *                     notification:
 *                       type: Array
 *                       exemple: []
 *                       remark: check notification form
 *                     emailValidation:
 *                       type: boolean
 *                       remark: is email validate or not.
 *                     isteacher:
 *                       type: boolean
 *                       remark: is user teacher or not.
 *                     isHasPicture:
 *                       type: boolean
 *                       remark: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       remark: picture of his email in type link .
 *                       exemple : https://google.com/userid/picture
 *                     domain:
 *                       type: string
 *                       remark: this properties showed when user is teacher
 *                       exemple: web developper
 *                     points:
 *                       type: number
 *                       remark: this properties showed when user isn't teacher
 *                       exemple: 123
 *       422:
 *         description: all inputs is required
 *       400:
 *         description: username or password is inccorect
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/isLoggin:
 *   get:
 *     tags: [User]
 *     summary: first fetch to get is loggin and user data
 *     responses:
 *       200:
 *         description: is loggin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       remark: his id in teacher/studien.
 *                       exemple: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: exemple
 *                     bio:
 *                       type: string
 *                       exemple: hi i'm user
 *                     notification:
 *                       type: Array
 *                       exemple: []
 *                       remark: check notification form
 *                     emailValidation:
 *                       type: boolean
 *                       remark: is email validate or not.
 *                     isteacher:
 *                       type: boolean
 *                       remark: is user teacher or not.
 *                     isHasPicture:
 *                       type: boolean
 *                       remark: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       remark: picture of his email in type link .
 *                       exemple : https://google.com/userid/picture
 *                     domain:
 *                       type: string
 *                       remark: this properties showed when user is teacher
 *                       exemple: web developper
 *                     points:
 *                       type: number
 *                       remark: this properties showed when user isn't teacher
 *                       exemple: 123
 *       204:
 *         description: is not loggin
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/:
 *   put:
 *     tags: [User]
 *     summary: update user info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 remark: if username not changed put it empty string
 *                 example: exemple@gmail.com
 *               password:
 *                 type: string
 *                 remark: if password not changed put it empty string
 *                 example: yourpassword123
 *               currentPassword:
 *                 type: string
 *                 example: yourpassword123
 *               bio:
 *                 type: string
 *                 remark: if bio not changed put the current bio
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: exemple
 *                     bio:
 *                       type: string
 *                       exemple: hi i'm user
 *       204:
 *         description: nothing change
 *       404:
 *         description: for two reason are in exemple
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   exemple: password or current password are empty or user not found
 *       403:
 *         description: username is already exist
 *       400:
 *         description: for two reason are in exemple 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   exemple: confirm password incorrect or current password are incorrect
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/:
 *   delete:
 *     tags: [User]
 *     summary: delete account
 *     responses:
 *       204:
 *         description: deleted succesfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */

// * route
const user = express.Router();
// * routes
// ? post
user.post("/signup", singup);
user.post("/login", login);
// ? get
user.get("/isLoggin", isLoggin);
// ? update
user.put("/", verifyToken, updateUserInfo);
// ? delete
user.delete("/", verifyToken, deleteAccount);
// * google routes
user.get("/login/failed", googleFaild);
user.get("/logout", googleLogOut);
export default user;
