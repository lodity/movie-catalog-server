import { Schema, model } from 'mongoose';
import IToken from './IToken';

const TokenSchema: Schema<IToken> = new Schema<IToken>({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
});

export default model<IToken>('Token', TokenSchema);
