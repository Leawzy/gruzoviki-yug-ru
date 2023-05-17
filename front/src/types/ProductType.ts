export interface ProductIF {
    category: {
        title: string;
        id: number;
    };
    id: number;
    title: string;
    shortDesc: string;
    popular?: number;
    img: string;
    quantity: number;
    brand: BrandProduct;
    sale: boolean;
    price: number;
    art: string;
    description: string;
    IsFavorite?: boolean;
}

export interface ProductCardIF {
    id: number;
    title: string;
    shortDesc: string;
    popular?: number;
    img: string;
    quantity: number;
    sale: boolean;
    price: number;
    art: string;
    brand: BrandProduct;
}

export interface ProductPage {
    property: {
        [key: string]: string;
    };
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
    category: CategoryProduct;
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
    property: {
        [key: string]: string;
    };
}

export interface BrandProduct {
    id?: string;
    title: string;
    img?: string;
}
