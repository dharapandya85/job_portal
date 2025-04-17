import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'
import rateLimit from 'express-rate-limit';

//ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // return rate limit info in the `RateLimit-*` headers; 
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
//router object
const router =express.Router()

//routes

/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - location
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user collection
 *        name:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: User email address
 *        password:
 *          type: string
 *          description: User password should be greater than 6 characters
 *        location:
 *          type: string
 *          description: User location city or country
 *      example:
 *        id: GHJDFJHDFJH
 *        name: John
 *        lastName: Doe
 *        email: johndoe@gmail.com
 *        password: test@123
 *        location: Mumbai
 */

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
//REGISTER || POST
router.post('/register',limiter,registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *        description:  login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: something went wrong
 */

//LOGIN || POST
router.post('/login',limiter,loginController);
//export
export default router;