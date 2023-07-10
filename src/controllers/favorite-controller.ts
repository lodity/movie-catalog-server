import { NextFunction, Response } from 'express';
import {
	IFavoriteRequest,
	IFavoriteRequestAdd,
	IFavoriteRequestRemove,
} from '../models/interfaces/IFavoriteRequest';
import FavoriteService from '../services/favorite-service';
import ApiError from '../exceptions/api-error';

class FavoriteController {
	async get(req: IFavoriteRequest, res: Response, next: NextFunction) {
		try {
			const { userId } = req.query;
			const list = await FavoriteService.get(userId);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
	async add(req: IFavoriteRequestAdd, res: Response, next: NextFunction) {
		try {
			const { userId } = req.query;
			const { favorites } = req.body;
			const list = await FavoriteService.add(userId, favorites);
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
			const { userId, favoriteId } = req.query;
			const list = await FavoriteService.remove(
				userId,
				parseInt(favoriteId)
			);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
	async clear(req: IFavoriteRequest, res: Response, next: NextFunction) {
		try {
			const { userId } = req.query;
			const list = await FavoriteService.clear(userId);
			return res.json(list);
		} catch (e) {
			next(e);
		}
	}
}

export default new FavoriteController();
