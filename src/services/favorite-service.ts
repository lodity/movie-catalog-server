import { IFavoriteItem } from '../models/interfaces/IFavorite';
import FavoriteModel from '../models/schemas/favorite-model';

class FavoriteService {
	async add(userId: string, favorite: IFavoriteItem[]) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			list.favorite.push(...favorite);
			return list.save();
		}
		return await FavoriteModel.create({
			userId,
			favorite,
		});
	}
}
export default new FavoriteService();
