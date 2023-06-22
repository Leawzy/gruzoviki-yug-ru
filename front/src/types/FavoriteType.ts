import { BrandProduct } from './ProductType';

export interface FavoriteTypeIF {
    products: any;
    id: number;
    title: string;
    shortDesc: string;
    popular?: number;
    img: string;
    quantity: number;
    sale: boolean;
    price: number;
    art?: string;
    description?: string;
    brand: BrandProduct;
}
