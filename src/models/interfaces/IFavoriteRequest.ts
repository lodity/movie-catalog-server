import { Request } from 'express';
import { IFavoriteItem } from './IFavorite';

export interface IFavoriteRequest extends Request {
	body: {
		userId: string;
	};
}
export interface IFavoriteRequestAdd extends Request {
	body: {
		userId: string;
		favorites: IFavoriteItem[];
	};
}
export interface IFavoriteRequestRemove extends Request {
	body: {
		userId: string;
		favoriteId: number;
	};
}
