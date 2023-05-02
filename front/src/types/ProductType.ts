export interface Product {
    property: PropertyProduct;
    id: number;
    title: string;
    shortDesc: string;
    popular?: number;
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

interface PropertyProduct {
    property: {
        [key: string]: string;
    };
}

interface CategoryProduct {
    title: string;
    property: {
        [key: string]: string;
    };
}

interface BrandProduct {
    title: string;
}
