import 'dotenv/config';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import UserService from '../services/user-service';
import {
	IUserRequestChangeAvatar,
	IUserRequestLogin,
	IUserRequestRegistration,
} from '../models/interfaces/IUserRequest';
import { NextFunction, Request, Response } from 'express';

class UserController {
	async registration(
		req: IUserRequestRegistration,
		res: Response,
		next: NextFunction
	) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest('Validation error', errors.array())
				);
			}
			const { username, email, password } = req.body;
			const userData = await UserService.registration(
				username,
				email,
				password
			);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async login(req: IUserRequestLogin, res: Response, next: NextFunction) {
		try {
			const { usernameOrEmail, password } = req.body;

			const errors = validationResult(req);

			const userData = await UserService.login(
				usernameOrEmail,
				password,
				errors.isEmpty()
			);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}
	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link;
			await UserService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL as string);
		} catch (e) {
			next(e);
		}
	}
	async checkAuth(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await UserService.checkAuth(refreshToken);
			return res.json({ isRefreshTokenValid: !!userData });
		} catch (e) {
			next(e);
		}
	}
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await UserService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.getUsers();
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
	async changeAvatar(
		req: IUserRequestChangeAvatar,
		res: Response,
		next: NextFunction
	) {
		try {
			const { userId } = req.body;
			const user = await UserService.changeAvatar(
				userId,
				req.files?.avatar
			);
			return res.json(user);
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
