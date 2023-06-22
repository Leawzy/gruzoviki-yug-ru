export interface CartItem {
    id: number;
    title: string;
    img: string;
    art: string;
    price: number;
    maxQuantity: number;
    quantity: number;
    addedToCart: boolean;
}

export interface RootState {
    favorites: {
        id: string;
        some(param: (item: { id: string }) => boolean): string;
    };
    cart: {
        items: CartItem[];
        totalItems: number;
    };
}
