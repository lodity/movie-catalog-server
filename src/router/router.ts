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
router.delete('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/checkAuth', UserController.checkAuth);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.put('/changeAvatar', authMiddleware, UserController.changeAvatar);

router.get('/getFavorite', authMiddleware, FavoriteController.get);
router.patch('/addFavorite', authMiddleware, FavoriteController.add);
router.delete('/removeFavorite', authMiddleware, FavoriteController.remove);
router.delete('/clearFavorite', authMiddleware, FavoriteController.clear);

export default router;
