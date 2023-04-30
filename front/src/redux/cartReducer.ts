import { ADD_TO_CART, REMOVE_FROM_CART } from './actionTypes';
import { CartItem } from '../types/CartType';

export interface CartState {
    items: CartItem[];
}

const getInitialState = (): CartState => {
    const storedCartItems =
        typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
    return {
        items: storedCartItems ? (JSON.parse(storedCartItems) as CartItem[]) : [],
    };
};

const initialState: CartState = getInitialState();

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { id, title, price, quantity, img, addedToCart } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);
            if (existingItemIndex >= 0) {
                const existingItem = state.items[existingItemIndex];
                const updatedItem = {
                    ...existingItem,
                };
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
                const newState = {
                    ...state,
                    items: updatedItems,
                };
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(newState.items));
                }
                return newState;
            }
            const newItem: CartItem = {
                id,
                title,
                img,
                price,
                quantity,
                addedToCart,
            };
            const newState = {
                ...state,
                items: [...state.items, newItem],
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(newState.items));
            }
            return newState;

        case REMOVE_FROM_CART:
            const itemId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === itemId);
            if (itemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems.splice(itemIndex, 1);
                const newState = {
                    ...state,
                    items: updatedItems,
                };
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(newState.items));
                }
                return newState;
            }
            return state;
        default:
            return state;
    }
};

export default cartReducer;
