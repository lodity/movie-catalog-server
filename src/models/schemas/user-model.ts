import { Schema, model } from 'mongoose';
import IUser from '../interfaces/IUser';

const UserSchema: Schema<IUser> = new Schema<IUser>({
	username: { type: String, unique: true, require: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
});
export default model<IUser>('User', UserSchema);
