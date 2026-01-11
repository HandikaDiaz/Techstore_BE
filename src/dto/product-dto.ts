import { url } from "inspector";

export interface createProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    rating: number;
    discount?: number;
    image?: string;
}

export interface editProductDto {
    name?: string;
    description?: string | undefined;
    price?: number | undefined;
    stock?: number | undefined;
    category?: Category | undefined;
    rating?: number | undefined;
    discount?: number | undefined;
    image?: string;
}

export interface ProductImageDto {
    url: string;
}

export enum Category {
    ELECTRONICS = 'ELECTRONICS',
    FASHION = 'FASHION',
    HOME = 'HOME',
    BEAUTY = 'BEAUTY',
    SPORTS = 'SPORTS',
    AUTOMOTIVE = 'AUTOMOTIVE',
    BOOKS = 'BOOKS',
    MUSIC = 'MUSIC'
}