import { Request } from 'express';

export default interface IUserRequest extends Request {
	body: {
		username: string;
		email: string;
		password: string;
	};
}
