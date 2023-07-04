import IUser from '../models/interfaces/IUser';

export default class UserDto {
	username: string;
	email: string;
	id: object;
	isActivated: boolean;

	constructor(model: IUser) {
		this.username = model.username;
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}
