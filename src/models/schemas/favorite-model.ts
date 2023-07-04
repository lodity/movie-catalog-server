import { Schema, model } from 'mongoose';
import { IFavorite, IFavoriteItem } from '../interfaces/IFavorite';

const FavoriteItemSchema: Schema<IFavoriteItem> = new Schema<IFavoriteItem>({
	id: { type: Number, required: true },
	poster_path: { type: String, required: true },
	backdrop_path: { type: String, required: true },
	title: { type: String, required: true },
	original_title: { type: String, required: true },
	media_type: { type: String, required: true },
	vote_average: { type: Number, required: true },
});
const FavoriteSchema: Schema<IFavorite> = new Schema<IFavorite>({
	userId: { type: String, unique: true, required: true },
	favorite: [FavoriteItemSchema],
});
export default model<IFavorite>('Favorite', FavoriteSchema);
