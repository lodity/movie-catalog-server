import IUser from '../models/IUser';

export default class UserDto {
	username: string;
	email: string;
	//TODO add type to id var
	id;
	isActivated: boolean;

	constructor(model: IUser) {
		this.username = model.username;
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}
