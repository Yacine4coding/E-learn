import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getUserPosts,
  posts,
  updatePost,
  voteDown,
  voteUp,
} from "../controller/post.js";
import { verifyToken } from "../middleware/jwt.js";
// * post api doc config
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Operations related to post management
 */
const post = express.Router();

/**
 * @swagger
 * /post:
 *   post:
 *     tags: [Post]
 *     summary: add new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: hi this my first post
 *     responses:
 *       201:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of post.
 *                       example: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: example
 *                     isHasPicture:
 *                       type: boolean
 *                       description: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       description: picture of his email in type link .
 *                       example : https://google.com/userid/picture
 *                     text:
 *                       type: string
 *                       example: hi is my first post
 *                     vote:
 *                       type: object
 *                       properties:
 *                         up:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *                         down:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *       401:
 *          description: unAuth
 *       422:
 *         description: text is required
 *       500:
 *         description: Internal server error
 */
post.post("/", verifyToken, addPost);

/**
 * @swagger
 * /post:
 *   get:
 *     tags: [Post]
 *     summary: get post of user connnecting
 *     responses:
 *       201:
 *         description : no posts
 *       200:
 *         description: user post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: Array
 *                   description : the posts is array of post format
 *                   example : arrau of post format (see post format)
 *                 count :
 *                   type : number
 *                   exapmle : 12
 *                   description : number of posts
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
post.get("/", verifyToken, getPosts);

/**
 * @swagger
 * /post/posts:
 *   get:
 *     tags: [Post]
 *     summary: get all posts
 *     responses:
 *       204:
 *         description : no posts
 *       200:
 *         description: return posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: Array
 *                   description : the posts is array of post format
 *                   example : array of post fromat (see post format)
 *                 count :
 *                   type : number
 *                   description : number of posts
 *       500:
 *         description: Internal server error
 */
post.get("/posts", posts);

/**
 * @swagger
 * /post/userpost/:userId:
 *   get:
 *     tags: [Post]
 *     summary: get post of user selected
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user who want to get his posts.
 *         example: 1HG6Rfjg54hgk
 *     responses:
 *       201:
 *         description : no posts
 *       200:
 *         description: user post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: Array
 *                   description : the posts is array of post format
 *                   example : array of post format (see post format)
 *                 count :
 *                   type : number
 *                   description : number of posts
 *                   exapmle : 12
 *       422:
 *          description : user id not found
 *       401:
 *          description : unAuth
 *       404:
 *          description : user not found
 *       500:
 *         description: Internal server error
 */
post.get("/userpost/:userId", verifyToken, getUserPosts);

/**
 * @swagger
 * /post/:postId:
 *   put:
 *     tags: [Post]
 *     summary: update post
 *     parameters:
 *       - in: path
 *         name : postId
 *         required : true 
 *         schema:
 *           type : string 
 *           exemple: dfhlq43h23k584
 *           description : the unique id of post who want to update it
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: hi this my first post
 *     responses:
 *       200:
 *         description: update succesfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of post.
 *                       example: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: example
 *                     isHasPicture:
 *                       type: boolean
 *                       description: is user has picture or not.
 *                       example : true
 *                     picture:
 *                       type: string
 *                       description: picture of his email in type link .
 *                       example : https://google.com/userid/picture
 *                     text:
 *                       type: string
 *                       example: hi is my first post
 *                     vote:
 *                       type: object
 *                       properties:
 *                         up:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *                         down:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *       422:
 *         description: post id or text are empty
 *       404:
 *         description: post not found
 *       403:
 *         description: when the user isn't the owner of post
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
post.put("/:postId", verifyToken, updatePost);

/**
 * @swagger
 * /post/vote/up/:postId:
 *   put:
 *     tags: [Post]
 *     summary: vote up or delete your vote
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the post who want to vote or delete vote.
 *           example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: voting up  or delete vote successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of post.
 *                       example: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: example
 *                     isHasPicture:
 *                       type: boolean
 *                       description: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       description: picture of his email in type link .
 *                       example : https://google.com/userid/picture
 *                     text:
 *                       type: string
 *                       example: hi is my first post
 *                     vote:
 *                       type: object
 *                       properties:
 *                         up:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *                         down:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *       422:
 *         description: post id or text are empty
 *       404:
 *         description: post or post owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
post.put("/vote/up/:postId", verifyToken, voteUp);

/**
 * @swagger
 * /post/vote/down/:postId:
 *   put:
 *     tags: [Post]
 *     summary: votting down 
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the post who want to vote or delete vote.
 *           example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: voting down or delete vote down successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of post.
 *                       example: d7ZOFL34ld
 *                     username:
 *                       type: string
 *                       example: example
 *                     isHasPicture:
 *                       type: boolean
 *                       description: is user has picture or not.
 *                     picture:
 *                       type: string
 *                       description: picture of his email in type link .
 *                       example : https://google.com/userid/picture
 *                     text:
 *                       type: string
 *                       example: hi is my first post
 *                     vote:
 *                       type: object
 *                       properties:
 *                         up:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *                         down:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 123
 *                             usersId:
 *                               type: Array
 *                               example: [1fsfq2q3,1d2s4f]
 *       422:
 *         description: post id or text are empty
 *       404:
 *         description: post or post owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
post.put("/vote/down/:postId", verifyToken, voteDown);

/**
 * @swagger
 * /post/:postId :
 *   delete:
 *     tags : [Post]
 *     summary : to delete the post 
 *     parameters :
 *       - in: path
 *         name : postId
 *         required : true
 *         schema :
 *           type : string 
 *           description: The unique identifier of the post who want to vote or delete vote.
 *           example : dfhqmsd4893Kh43khs3hH 
 *     responses:
 *       204:
 *         description : delete successfuly
 *       422:
 *         description : post id not found
 *       400:
 *         description : delete faild probably is not the post owner 
 *       401:
 *          description: unAuth
 *       500:
 *         description : internal server error
 */
post.delete("/:postId", verifyToken, deletePost);

export default post;