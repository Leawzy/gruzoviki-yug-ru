export interface Product {
    id: string | number;
    title: string;
    shortDesc: string;
    img: string;
    quantity: number;
    brand: string;
    sale: boolean;
    price: number;
    art?: string;
    description?: string;
    category?: CategoryProduct;
}

export interface PropertyIF {
    id: string | number;
    country: string;
    description: string;
    warranty: string;
    start_date: string;
}

interface CategoryProduct {
    title: string;
}
