export interface Product {
    id: string | number;
    title: string;
    shortDesc: string;
    img: string;
    quantity: number;
    brand: BrandProduct;
    sale: boolean;
    price: number;
    art?: string;
    description?: string;
    category?: CategoryProduct;
}

export interface MetaIF {
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface CategoryProduct {
    title: string;
}

interface BrandProduct {
    title: string;
}
