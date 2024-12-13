/**
 * @swagger
 * tags:
 *   name: Studient
 *   description: Operations related to studient management (testing)
 */
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
/**
 * @swagger
 * /studient/updateProgress/:courseId:
 *   put:
 *     tags: [Studient]
 *     summary: update Progress
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         example: 343lhjfl454
 *         description: the course you want buy it
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newChapterNumber
 *             properties:
 *               newChapterNumber:
 *                 description: new chapter number
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: buy succesfull (not complited)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *                   description: full course info schemas
 *                   type: object
 *       422:
 *         description: the studient id is not match with the id of who buy the course
 *       400:
 *         description: chapter number must be gratter than current chapter number
 *       500:
 *         description: internal server error
 *       401:
 *         description: unauth
 */
/**
 * @swagger
 * /studient/:courseId:
 *   post:
 *     tags: [Studient]
 *     summary: buy new course (200 status response not complited)
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         example: 343lhjfl454
 *         description: the course you want buy it
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: buy succesfull (not complited)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   description: buy successfuly (for now)
 *                   example: buy successfuly
 *       400:
 *         description: studient is already buy this course or course not found
 *       500:
 *         description: internal server error
 *       401:
 *         description: unauth
 */

/**
 * @swagger
 * /studient/:courseId:
 *   delete:
 *     tags: [Studient]
 *     summary: delete course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         example: 343lhjfl454
 *         description: the course you want buy it
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: delete without return any data
 *       400:
 *         description: studient is already buy this course or course not found
 *       500:
 *         description: internal server error
 *       401:
 *         description: unauth
 */
