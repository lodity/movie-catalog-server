import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserRequest extends Request {
	user?: JwtPayload;
}

export interface IUserRequestRegistration extends IUserRequest {
	body: {
		username: string;
		email: string;
		password: string;
	};
}
export interface IUserRequestLogin extends IUserRequest {
	body: {
		usernameOrEmail: string;
		password: string;
	};
}
export interface IUserRequestChangeAvatar extends Request {
	body: {
		userId: string;
		avatarLink: string;
	};
}
