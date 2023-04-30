import { ADD_TO_CART, REMOVE_FROM_CART } from './actionTypes';

export const addToCart = (
    id: number,
    title: string,
    price: number,
    img: string,
    addedToCart: boolean,
    quantity: number
) => ({
    type: ADD_TO_CART,
    payload: { id, title, price, img, addedToCart, quantity },
});

export const removeFromCart = (id: number) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
