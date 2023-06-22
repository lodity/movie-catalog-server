import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface IUserRequest extends Request {
	body: {
		username: string;
		email: string;
		password: string;
	};
	user?: JwtPayload;
}
