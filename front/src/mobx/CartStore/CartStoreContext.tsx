import React, { createContext, useContext } from 'react';

type CartItem = {
    id: number;
    price: number;
    title: string;
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    addItem: (item: {
        quantity: number | string;
        price: number | string;
        id: string | number;
        title: string;
    }) => void;
    removeItem: (id: number | string) => void;
    getItemStore: () => CartItem[];
};

export const CartStoreContext = createContext<CartStore | undefined>(undefined);

export const useCartStore = () => {
    const store = useContext(CartStoreContext);
    if (!store) {
        throw new Error('useCartStore must be used within a CartStoreProvider');
    }
    return store;
};

type CartStoreProviderProps = {
    value: CartStore;
    children: React.ReactNode;
};

export function CartStoreProvider({ value, children }: CartStoreProviderProps) {
    return <CartStoreContext.Provider value={value}>{children}</CartStoreContext.Provider>;
}