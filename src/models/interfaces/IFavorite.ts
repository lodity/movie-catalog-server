import { Document } from 'mongoose';

export interface IFavoriteItem {
	id: number;
	poster_path: string;
	backdrop_path: string;
	title: string;
	original_title: string;
	media_type: string;
	vote_average: number;
}
export interface IFavorite extends Document {
	userId: string;
	favorites: IFavoriteItem[];
}
