import express from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/user-controller';
// import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 4, max: 32 }),
	UserController.registration
);
// router.post('/login', UserController.login);
// router.post('/logout', UserController.logout);
// router.get('/activate/:link', UserController.activate);
// router.get('/refresh', UserController.refresh);
// router.get('/users', UserController.getUsers);

export default router;