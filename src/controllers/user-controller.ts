import 'dotenv/config';
import { cookie, validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import UserService from '../services/user-service';

class UserController {
	async registration(
		req: { [key: string]: any },
		res: { [key: string]: any },
		next: Function
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
	// async login(req, res, next) {
	// 	try {
	// 		const { email, password } = req.body;
	// 		const userData = await UserService.login(email, password);
	// 		res.cookie('refreshToken', userData.refreshToken, {
	// 			maxAge: 7 * 24 * 60 * 60 * 1000,
	// 			httpOnly: true,
	// 		});
	// 		return res.json(userData);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
	// async logout(req, res, next) {
	// 	try {
	// 		const { refreshToken } = req.cookies;
	// 		const token = await UserService.logout(refreshToken);
	// 		res.clearCookie('refreshToken');
	// 		return res.json(token);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
	// async activate(req, res, next) {
	// 	try {
	// 		const activationLink = req.params.link;
	// 		await UserService.activate(activationLink);
	// 		return res.redirect(process.env.CLIENT_URL);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
	// async refresh(req, res, next) {
	// 	try {
	// 		const { refreshToken } = req.cookies;
	// 		const userData = await UserService.refresh(refreshToken);
	// 		res.cookie('refreshToken', userData.refreshToken, {
	// 			maxAge: 7 * 24 * 60 * 60 * 1000,
	// 			httpOnly: true,
	// 		});
	// 		return res.json(userData);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
	// async getUsers(req, res, next) {
	// 	try {
	// 		const users = await UserService.getAllUsers();
	// 		return res.json(users);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
}

export default new UserController();
