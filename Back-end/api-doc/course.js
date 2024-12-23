/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Operations related to courses management
 */

/**
 * @swagger
 * /course:
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
 *                 example: array of chapter schema (see chapret schema from schemas)
 *     responses:
 *       201:
 *         description: create post successfuly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/fullCourseSchema'
 *       400:
 *         description: the chapter or the queez of chapter not correct
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: the user is not a theacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: unAuth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: one of request body propertie is empty or chapterNumer is lower than 1
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
 *                   type: array
 *                   example: array of full course format(see in schamas)
 *       204:
 *         description: no courses yet
 *       403:
 *         description: the user is not a theacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: unAuth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
 *                   type: array
 *                   description: array of courses schema
 *                   example: array of courses schema
 *       204:
 *         description: the teacher don't have a coureses yet
 *       400:
 *         description: the id in parameter isn't of teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: teacher not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: unauth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: teacher id is empty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /course/bestCourses/:count:
 *   get:
 *     tags: [Course]
 *     summary: get best courses
 *     parameters:
 *       - in: path
 *         name: count
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
 *                 courses:
 *                   type: array
 *                   description: array of normal courses schema
 *                   example: array of normal courses schema
 *       204:
 *         description: the app don't have coureses yet
 *       400:
 *         description: the count in parameter must be greater than 0
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /course/:courseId:
 *   put:
 *     tags: [Course]
 *     summary: get best courses
 *     parameters:
 *       - in: path
 *         name: couseId
 *         required: true
 *         schema:
 *           type: string
 *         description: the unique id of course who want to update it
 *         example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: the courses updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/fullCourseSchema'
 *       204:
 *         description: nothin update
 *       403:
 *         desctiprion: the user isn't the course owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /favorite/:courseId:
 *   put:
 *     tags: [Course]
 *     summary: add or remove a course in favorite list
 *     parameters:
 *       - in: path
 *         name: couseId
 *         required: true
 *         schema:
 *           type: string
 *         description: the unique id of course who want to update it
 *         example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: add or remove succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: un auth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /wishlist/:courseId:
 *   put:
 *     tags: [Course]
 *     summary: add or remove a course in wishlist list
 *     parameters:
 *       - in: path
 *         name: couseId
 *         required: true
 *         schema:
 *           type: string
 *         description: the unique id of course who want to update it
 *         example: 1HG6Rfjg54hgk
 *     responses:
 *       200:
 *         description: add or remove succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: un auth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */



/**
 * @swagger
 * /course/courseById:
 *   get:
 *     tags: [Course]
 *     summary: get course by id
 *     responses:
 *       200:
 *         description: result of req
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 related:
 *                   type: string
 *                   example: none or teacher or owner
 *                 course:
 *                   $ref: '#/components/schemas/fullCourseSchema'
 *       422:
 *         description: course id are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: unavaible
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
