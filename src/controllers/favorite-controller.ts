import { NextFunction, Response } from 'express';
import {
	IFavoriteRequest,
	IFavoriteRequestAdd,
	IFavoriteRequestRemove,
} from '../models/interfaces/IFavoriteRequest';
import FavoriteService from '../services/favorite-service';

class FavoriteController {
	async get(req: IFavoriteRequest, res: Response, next: NextFunction) {
		try {
			const { userId } = req.body;
			const list = await FavoriteService.get(userId);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
	async add(req: IFavoriteRequestAdd, res: Response, next: NextFunction) {
		try {
			const { userId, favorite } = req.body;
			const list = await FavoriteService.add(userId, favorite);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
	async remove(
		req: IFavoriteRequestRemove,
		res: Response,
		next: NextFunction
	) {
		try {
			const { userId, favoriteId } = req.body;
			const list = await FavoriteService.remove(userId, favoriteId);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
}

export default new FavoriteController();
