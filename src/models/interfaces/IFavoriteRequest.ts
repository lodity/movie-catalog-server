import { Request } from 'express';
import { IFavoriteItem } from './IFavorite';

export interface IFavoriteRequest extends Request {
	query: {
		userId: string;
	};
}
export interface IFavoriteRequestAdd extends IFavoriteRequest {
	body: {
		favorites: IFavoriteItem[];
	};
}
export interface IFavoriteRequestRemove extends Request {
	query: {
		userId: string;
		favoriteId: string;
	};
}
