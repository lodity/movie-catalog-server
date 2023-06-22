import ApiError from '../exceptions/api-error';
import TokenService from '../services/token-service';
import IUserRequest from '../models/IUserRequest';
import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default function (req: IUserRequest, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = TokenService.validateAccessToken(
			accessToken
		) as JwtPayload;
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
}
