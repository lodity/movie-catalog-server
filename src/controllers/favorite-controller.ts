import { NextFunction, Response } from 'express';
import { IFavoriteRequestAdd } from '../models/interfaces/IFavoriteRequest';
import FavoriteService from '../services/favorite-service';

class FavoriteController {
	async add(req: IFavoriteRequestAdd, res: Response, next: NextFunction) {
		try {
			const { userId, favorite } = req.body;
			const list = await FavoriteService.add(userId, favorite);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
}

export default new FavoriteController();
