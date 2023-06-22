import 'dotenv/config';
import jwt from 'jsonwebtoken';
import TokenModel from '../models/token-model';
import tokenModel from '../models/token-model';

class TokenService {
	generateTokens(payload: {}) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET || '',
			{
				expiresIn: '30m',
			}
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET || '',
			{
				expiresIn: '7d',
			}
		);
		return {
			accessToken,
			refreshToken,
		};
	}
	// validateAccessToken(token) {
	// 	try {
	// 		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
	// 		return userData;
	// 	} catch (e) {
	// 		return null;
	// 	}
	// }
	validateRefreshToken(token: string) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
		} catch (e) {
			return null;
		}
	}
	async saveToken(userId: any, refreshToken: string) {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		return await TokenModel.create({ user: userId, refreshToken });
	}
	async removeToken(refreshToken: string) {
		return tokenModel.deleteOne({ refreshToken });
	}
	async findToken(refreshToken: string) {
		return tokenModel.findOne({ refreshToken });
	}
}

export default new TokenService();
