/**
 * @swagger
 * components:
 *   schemas:
 *     CourseSchema:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: user_teacher_0323
 *         isHasPicture:
 *           type: boolean
 *           example: true
 *         picture:
 *           type: string
 *           example: https://google.com/userPicture
 *           description: the picture of user if he have it
 *         courseId:
 *           type: string
 *           example: lkds34kdjsD30RC
 *         description:
 *           type: string
 *           example: this for kink's endian defence
 *         teacherId:
 *           type: string
 *           example: lkds34kdjsD30RC
 *     fullCourseSchema:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: user_teacher_0323
 *         isHasPicture:
 *           type: boolean
 *           example: true
 *         picture:
 *           type: string
 *           example: https://google.com/userPicture
 *           description: the picture of user if he have it
 *         courseId:
 *           type: string
 *           example: lkds34kdjsD30RC
 *         description:
 *           type: string
 *           example: this for kink's endian defence
 *         payCount:
 *           type: number
 *           example: 22.3
 *         teacherId:
 *           type: string
 *           example: lkds34kdjsD30RC
 *         chapterNumber:
 *           type: number
 *           example: 5
 *         chapters:
 *           type: Array
 *           example: array of chapter schemas
 *     chapterSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: intro of kinks indian defence
 *         description:
 *           type: string
 *           example: description of chapter
 *           description: the picture of user if he have it
 *         link:
 *           type: string
 *           example: link of vedio youtube
 *         queez:
 *           type: Array
 *           example: array of queez schema
 *     queezSchema:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           example: intro of kinks indian defence
 *         choiches:
 *           type: Array
 *           example: array of choices
 *     choicesSchema:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: intro of kinks indian defence
 *         number:
 *           type: number
 *           example: 2
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     commentSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the comment
 *           example: lkshfd834j34HHG7
 *         text:
 *           type: string
 *           description: Comment content
 *           example: hi this is my first comment
 *         username:
 *           type: string
 *           description: Username of the post owner
 *           example: user123
 *         picture:
 *           type: string
 *           description: Link to the user's profile picture
 *           example: https://www.google.com/user/picture
 *         isHasPicture:
 *           type: boolean
 *           description: Indicates if the user has a profile picture
 *           example: true
 *         isreply:
 *            type: boolean
 *            description: is always true in this res
 *            example: false
 *         vote:
 *           type: object
 *           properties:
 *             up:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 123
 *                 usersId:
 *                   type: Array
 *                   example: [1fsfq2q3,1d2s4f]
 *             down:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 123
 *                 usersId:
 *                   type: Array
 *                   example: [1fsfq2q3,1d2s4f]
 *         replyInfo:
 *           description: this will send when isreply property are equal true
 *           type: object
 *           properties:
 *             picture:
 *               type: string
 *               description: return picture path or empty string
 *               example: false
 *             isHasPicture:
 *               type: boolean
 *               description: return if user have picture
 *               example: false
 *             username:
 *               type: string
 *               description: return user name of comment you reply it
 *               example: false
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     userSchema:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: his id in teacher/studien.
 *               exemple: d7ZOFL34ld
 *             username:
 *               type: string
 *               example: exemple
 *             bio:
 *               type: string
 *               exemple: hi i'm user
 *             notification:
 *               type: Array
 *               exemple: []
 *               description: check notification form
 *             emailValidate:
 *               type: boolean
 *               description: is email validate or not.
 *             isteacher:
 *               type: boolean
 *               description: is user teacher or not.
 *             isHasPicture:
 *               type: boolean
 *               description: is user has picture or not.
 *             picture:
 *               type: string
 *               description: picture of his email in type link .
 *               exemple : https://google.com/userid/picture
 *             domain:
 *               type: string
 *               description: this properties showed when user is teacher
 *               exemple: web developper
 *             points:
 *               type: number
 *               description: this properties showed when user isn't teacher
 *               exemple: 123
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *               example: "An error occurred"
 */
