import { Request } from 'express';
import { IFavoriteItem } from './IFavorite';

export interface IFavoriteRequestAdd extends Request {
	body: {
		userId: string;
		favorite: IFavoriteItem[];
	};
}
export interface IFavoriteRequestRemove extends Request {
	body: {
		userId: string;
		favoriteId: number;
	};
}
