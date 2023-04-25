export interface Product {
    data?: DataIF;
    description?: string;
    product?: string[];
    products?: string[];
    id: string | number;
    shortDesc: string;
    img: string;
    quantity: number;
    brand: string;
    title: string;
    sale: boolean;
    price: number;
}

interface DataIF {
    id: string | number;
    property: PropertyIF;
    price: string | number;
    art: number | string;
    title: string;
    brand: string;
    quantity: string;
    category: CategoryIf;
    img: string | undefined;
    short_desc: string;
}

interface CategoryIf {
    id: number | string;
    title: string;
}

export interface PropertyIF {
    id: string | number;
    country: string;
    description: string;
    warranty: string;
    start_date: string;
}
