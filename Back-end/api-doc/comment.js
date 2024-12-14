/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Operations related to comment management
 */
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
 *       201:
 *         description: Successfully created a new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/commentSchema'
 *       404:
 *         description: comment not found
 *       422:
 *         description: text are empty
 *       500:
 *         description: internal server error
 *       401:
 *         description: unauth
 */

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
 *       201:
 *         description: Successfully created a new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/commentSchema'
 *       422:
 *         description: text are empty
 *       404:
 *         description: Post not found
 *       401:
 *         description: unauth
 *       500:
 *         description: internal server error
 */

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
 *       204:
 *         description: no comment yet
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: internal server error
 */

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
 *         description: update successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/commentSchema'
 *       422:
 *         description: text are empty
 *       404:
 *         description: comment not found
 *       403:
 *         description: the user isn't the post owner
 *       500:
 *         description: internal server error
 */

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
 *         description: vote up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/commentSchema'
 *       422:
 *         description: comment id or text are empty
 *       404:
 *         description: comment or comment owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
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
 *       201:
 *         description: vote down
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/commentSchema'
 *       422:
 *         description: text are empty
 *       404:
 *         description: comment or comment owner not found
 *       401:
 *          description: unAuth
 *       500:
 *         description: Internal server error
 */
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
 *       500:
 *         description: internal server error
 */
