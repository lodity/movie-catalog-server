import express from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';
import FavoriteController from '../controllers/favorite-controller';

const router = express.Router();

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 4, max: 32 }),
	UserController.registration
);
router.post('/login', body('usernameOrEmail').isEmail(), UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/checkAuth', UserController.checkAuth);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

router.post('/getFavorite', authMiddleware, FavoriteController.get);
router.post('/addFavorite', authMiddleware, FavoriteController.add);
router.post('/removeFavorite', authMiddleware, FavoriteController.remove);

export default router;
