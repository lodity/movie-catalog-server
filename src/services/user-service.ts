import 'dotenv/config';
import UserModel from '../models/schemas/user-model';
import bcrypt from 'bcrypt';
import MailService from './mail-service';
import UserDto from '../dto/user-dto';
import ApiError from '../exceptions/api-error';
import { randomUUID } from 'crypto';
import TokenService from './token-service';
import { JwtPayload } from 'jsonwebtoken';
import IUser from '../models/interfaces/IUser';
import FileService from './fileService';

class UserService {
	async registration(username: string, email: string, password: string) {
		const candidate = [
			await UserModel.findOne({ username }),
			await UserModel.findOne({ email }),
		];
		if (candidate[0]) {
			throw ApiError.BadRequest(
				`User with same username "${username}" already exist`
			);
		} else if (candidate[1]) {
			throw ApiError.BadRequest(
				`User with same email address "${email}" already exist`
			);
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const activationLink = randomUUID();

		const user = await UserModel.create({
			username,
			email,
			password: hashPassword,
			activationLink,
		});
		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`
		);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
	async activate(activationLink: string) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link');
		}
		user.isActivated = true;
		await user.save();
	}
	async login(emailOrUsername: string, password: string, isEmail: boolean) {
		const user = isEmail
			? await UserModel.findOne({ email: emailOrUsername })
			: await UserModel.findOne({ username: emailOrUsername });
		if (!user) {
			throw ApiError.BadRequest(
				`User with this email address or username ${emailOrUsername} not found`
			);
		}

		const isPassEquals = bcrypt.compareSync(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest('Incorrect password');
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
	async logout(refreshToken: string) {
		return await TokenService.removeToken(refreshToken);
	}
	async checkAuth(refreshToken: string) {
		const userData = TokenService.validateRefreshToken(
			refreshToken
		) as JwtPayload;
		if (!userData) {
			throw ApiError.UnauthorizedError(", refresh token isn't invalid");
		}
		return userData;
	}
	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = TokenService.validateRefreshToken(
			refreshToken
		) as JwtPayload;
		const tokenFromDb = await TokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = (await UserModel.findById(userData.id)) as IUser;
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
	async getUsers() {
		const users = await UserModel.find();
		return users;
	}
	async changeAvatar(userId: string, avatar: any) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.BadRequest('User not found');
		}
		const avatarLink = FileService.saveFile(
			avatar,
			user.avatarLink ? user.avatarLink : 'none'
		);
		user.avatarLink = avatarLink || 'none';
		await user.save();
		return user;
	}
}

export default new UserService();
