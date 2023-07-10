import { IFavoriteItem } from '../models/interfaces/IFavorite';
import FavoriteModel from '../models/schemas/favorite-model';
import ApiError from '../exceptions/api-error';

class FavoriteService {
	async get(userId: string) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			return list.favorites;
		}
		throw ApiError.BadRequest(
			'Favorite list with this userId does not exist'
		);
	}
	async add(userId: string, favorites: IFavoriteItem[]) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			favorites.forEach((value) => {
				if (list.favorites.find((item) => item.id === value.id)) {
					throw ApiError.BadRequest(
						`Favorite item with this id '${value.id}' already exist`
					);
				}
			});

			list.favorites.push(...favorites);
			return list.save();
		}
		return await FavoriteModel.create({
			userId,
			favorites,
		});
	}
	async remove(userId: string, favoriteId: number) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			if (!list.favorites.find((item) => item.id === favoriteId)) {
				throw ApiError.BadRequest(
					'Favorite item with this id does not exist'
				);
			}
			list.favorites = list.favorites.filter(
				(item) => item.id !== favoriteId
			);
			return list.save();
		}
		throw ApiError.BadRequest(
			'Favorite list with this userId does not exist'
		);
	}
	async clear(userId: string) {
		const list = await FavoriteModel.findOne({ userId });
		if (list) {
			list.favorites = [];
			return list.save();
		}
		throw ApiError.BadRequest(
			'Favorite list with this userId does not exist'
		);
	}
}
export default new FavoriteService();
