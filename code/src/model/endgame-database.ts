import { Category } from './category';
import { endgamedatabaseJson } from '../static';

export interface EndgameDatabase {
    version: string;
    categories: Category[];
    count: number;
}

export const endgameDatabase: EndgameDatabase = <any>endgamedatabaseJson;