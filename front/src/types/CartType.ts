export interface CartItem {
    id: number;
    title: string;
    img: string;
    price: number;
    maxQuantity: number;
    quantity: number;
    addedToCart: boolean;
}

export interface RootState {
    cart: {
        items: CartItem[];
        totalItems: number;
    };
}
