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
 *                 description: default value is false.
 *                 example: true
 *               picture:
 *                 type: string
 *                 description: avatar url or link
 *                 example: avatarName.svg
 *     responses:
 *       201:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userSchema'
 *       422:
 *         description: all inputs is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: email is already exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: email not correct example@gmail.com
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *               $ref: '#/components/schemas/userSchema'
 *       422:
 *         description: all inputs is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: username or password is inccorect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *               $ref: '#/components/schemas/userSchema'
 *       204:
 *         description: is not loggin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *                 description: if username not changed put it empty string
 *                 example: exemple@gmail.com
 *               password:
 *                 type: string
 *                 description: if password not changed put it empty string
 *                 example: yourpassword123
 *               currentPassword:
 *                 type: string
 *                 example: yourpassword123
 *               bio:
 *                 type: string
 *                 description: if bio not changed put the current bio or put it false
 *                 example: yourpassword123
 *               email:
 *                 type: string
 *                 description: if email not changed put the current bio or put it false
 *                 example: example@gmail.com
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
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: username is already exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: for two reason are in exemple
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *       401:
 *         description: unAuth
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 *   /user/logout:
 *     get:
 *       summary: log out of account
 *       tags: [User]
 *       responses:
 *         204:
 *           description: log out succesfuly
 */