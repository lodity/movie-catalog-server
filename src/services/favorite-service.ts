import { IFavoriteItem } from '../models/interfaces/IFavorite';
import FavoriteModel from '../models/schemas/favorite-model';
import ApiError from '../exceptions/api-error';

class FavoriteService {
	async get(userId: string) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			return list.favorite;
		}
		throw ApiError.BadRequest(
			'Favorite list with this userId does not exist'
		);
	}
	async add(userId: string, favorite: IFavoriteItem[]) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			favorite.forEach((value) => {
				if (list.favorite.find((item) => item.id === value.id)) {
					throw ApiError.BadRequest(
						`Favorite item with this id '${value.id}' already exist`
					);
				}
			});

			list.favorite.push(...favorite);
			return list.save();
		}
		return await FavoriteModel.create({
			userId,
			favorite,
		});
	}
	async remove(userId: string, favoriteId: number) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			if (!list.favorite.find((item) => item.id === favoriteId)) {
				throw ApiError.BadRequest(
					'Favorite item with this id does not exist'
				);
			}
			list.favorite = list.favorite.filter(
				(item) => item.id !== favoriteId
			);
			return list.save();
		}
		throw ApiError.BadRequest(
			'Favorite list with this userId does not exist'
		);
	}
}
export default new FavoriteService();
