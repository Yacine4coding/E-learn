import express from "express";
import {
  addComment,
  addReply,
  deleteComment,
  getPostComments,
  updateComments,
  voteDown,
  voteUp,
} from "../controller/comment.js";
import { verifyToken } from "../middleware/jwt.js";
// comment api doc config
/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Operations related to comment management
 */
const comment = express.Router();

/**
 * @swagger
 * /comment/addreply:
 *   post:
 *     tags: [Comment]
 *     summary: to add a reply for comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - postId
 *               - commentId
 *             properties:
 *               text:
 *                 type: string
 *                 example: this my reply
 *               postId:
 *                 type: string
 *                 example: dkfhmqls34r234
 *               commentId:
 *                 type: string
 *                 example: dkfhmqls34r234
 *     responses:
 *       200:
 *         description: Successfully created a new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique ID of the comment
 *                       example: lkshfd834j34HHG7
 *                     text:
 *                       type: string
 *                       description: Comment content
 *                       example: hi this is my first comment
 *                     username:
 *                       type: string
 *                       description: Username of the post owner
 *                       example: user123
 *                     picture:
 *                       type: string
 *                       description: Link to the user's profile picture
 *                       example: https://www.google.com/user/picture
 *                     isHasPicture:
 *                       type: boolean
 *                       description: Indicates if the user has a profile picture
 *                       example: true
 *                     isreply:
 *                        type: boolean
 *                        description: is always true in this res
 *                        example: false
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
 *                     replyInfo:
 *                       description: this will send when isreply property are equal true
 *                       type: object
 *                       properties:
 *                         picture:
 *                           type: string
 *                           description: return picture path or empty string
 *                           example: false
 *                         isHasPicture:
 *                           type: boolean
 *                           description: return if user have picture
 *                           example: false
 *                         username:
 *                           type: string
 *                           description: return user name of comment you reply it
 *                           example: false
 *
 *       404:
 *         description: comment not found
 *       422:
 *         description: one of body properties are empty
 *       500:
 *         description: internal server error
 *       401:
 *         description: unauth
 */
comment.post("/addreply", verifyToken, addReply);

/**
 * @swagger
 * /comment/:postId:
 *   post:
 *     tags: [Comment]
 *     summary: Add a comment
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post
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
 *                 example: hi this my first comment
 *     responses:
 *       200:
 *         description: Successfully created a new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique ID of the comment
 *                       example: lkshfd834j34HHG7
 *                     text:
 *                       type: string
 *                       description: Comment content
 *                       example: hi this is my first comment
 *                     username:
 *                       type: string
 *                       description: Username of the post owner
 *                       example: user123
 *                     picture:
 *                       type: string
 *                       description: Link to the user's profile picture
 *                       example: https://www.google.com/user/picture
 *                     isHasPicture:
 *                       type: boolean
 *                       description: Indicates if the user has a profile picture
 *                       example: true
 *                     isreply:
 *                        type: boolean
 *                        description: is always true in this res
 *                        example: false
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
 *         description: Post ID or text not found
 *       404:
 *         description: Post not found
 *       401:
 *         description: unauth
 *       500:
 *         description: internal server error
 */
comment.post("/:postId", verifyToken, addComment);


/**
 * @swagger
 * /comment/:postId:
 *   get:
 *     tags: [Comment]
 *     summary: get comment of post selected
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: the unique identifierof post who want to get his comment
 *     responses:
 *       200:
 *         description: return comments and count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: string
 *                   example: 123
 *                 comments:
 *                   type: Array
 *                   example: array of comment format
 *       201:
 *         description: no comment yet
 *       422:
 *         description: post id not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: internal server error
 */
comment.get("/:postId", verifyToken, getPostComments);

/**
 * @swagger
 * /comment/:commentId:
 *   put:
 *     tags: [Comment]
 *     summary: update the comment content
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: the id of comment that you want to modify
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
 *                  type: string
 *                  description: the new content of comment
 *                  example: hello i update my comment
 *     responses:
 *       200:
 *         description: the comment is update successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique ID of the comment
 *                       example: lkshfd834j34HHG7
 *                     text:
 *                       type: string
 *                       description: Comment content
 *                       example: hi this is my first comment
 *                     username:
 *                       type: string
 *                       description: Username of the post owner
 *                       example: user123
 *                     picture:
 *                       type: string
 *                       description: Link to the user's profile picture
 *                       example: https://www.google.com/user/picture
 *                     isHasPicture:
 *                       type: boolean
 *                       description: Indicates if the user has a profile picture
 *                       example: true
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
 *         description: post id or text not found
 *       404:
 *         description: comment not found
 *       403:
 *         description: the user isn't the post owner
 *       500:
 *         description: internal server error
 */
comment.put("/:commentId", verifyToken, updateComments);

/**
 * @swagger
 * /comment/vote/up/:commentId:
 *   put:
 *     tags: [Comment]
 *     summary: vote up or delete your vote
 *     parameters:
 *       - in: path
 *         name: comment
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the comment who want to vote or delete vote.
 *           example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: voting up  or delete vote successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: id of comment.
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
 *                       example: hi is my first comment
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
 *         description: comment id or text are empty
 *       404:
 *         description: comment or comment owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
comment.put("/vote/up/:commentId", verifyToken, voteUp);

/**
 * @swagger
 * /comment/vote/down/:commentId:
 *   put:
 *     tags: [Comment]
 *     summary: votting down
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the comment who want to vote or delete vote.
 *           example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: voting down or delete vote down successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique ID of the comment
 *                       example: lkshfd834j34HHG7
 *                     text:
 *                       type: string
 *                       description: Comment content
 *                       example: hi this is my first comment
 *                     username:
 *                       type: string
 *                       description: Username of the post owner
 *                       example: user123
 *                     picture:
 *                       type: string
 *                       description: Link to the user's profile picture
 *                       example: https://www.google.com/user/picture
 *                     isHasPicture:
 *                       type: boolean
 *                       description: Indicates if the user has a profile picture
 *                       example: true
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
 *         description: comment id or text are empty
 *       404:
 *         description: comment or comment owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
comment.put("/vote/down/:commentId", verifyToken, voteDown);

/**
 * @swagger
 * /comment/:commentId:
 *   delete:
 *     tags: [Comment]
 *     summary: delete a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         description: the id of comment you want to delete it
 *         schema:
 *           type: string
 *           example: klgjfd483f44ffjD
 *     responses:
 *       204:
 *         description: delete successfully
 *       400:
 *         description: delete faild
 *       401:
 *         description: unAuthorization
 *       422:
 *         description: comment id not found
 */
comment.delete("/:commentId", verifyToken, deleteComment);
export default comment;
