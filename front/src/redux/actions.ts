import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    FETCH_FAVORITES_SUCCESS,
} from './actionTypes';
import { AnyAction, Dispatch } from 'redux';
import { apiFetch, setAuthToken } from '../axios/global';
import { RootState } from '../types/CartType';
import { ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';

export const addToCart = (
    id: number,
    title: string,
    price: number,
    img: string,
    addedToCart: boolean,
    maxQuantity: number,
    quantity: number,
    art: string | undefined
) => ({
    type: ADD_TO_CART,
    payload: { id, title, price, img, addedToCart, quantity, maxQuantity, art },
});

export const removeFromCart = (id: number) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});

export const addToFavorites = (id: string) => {
    return (dispatch: Dispatch) => {
        setAuthToken();
        apiFetch('api/featured/create', { method: 'post', data: { productId: id } })
            .then(() => {
                dispatch({ type: ADD_TO_FAVORITES, payload: id });
                toast.success('Товар был успешно добавлен в Избранное.');
            })
            .catch(error => {
                console.error(error);
                toast.error('Чтобы добавить в избранное, нужно авторизоваться.');
            });
    };
};

export const removeFromFavorites = (id: string) => {
    return (dispatch: Dispatch) => {
        setAuthToken();
        apiFetch(`/api/featured/delete`, { method: 'delete', data: { productId: id } })
            .then(() => {
                dispatch({ type: REMOVE_FROM_FAVORITES, payload: id });
                toast.success('Товар был успешно удален из Избранное.');
            })
            .catch(error => {
                console.error(error);
            });
    };
};

export const fetchFavorites = () => {
    return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
        setAuthToken();
        apiFetch('api/featured/get', { method: 'get' })
            .then(response => {
                const products = response.data.data?.products;
                if (products === undefined || null) {
                    return null;
                } else {
                    const productIds = products
                        ?.map((product: { id: number | undefined }) => product.id)
                        .filter((id: number | undefined) => id !== undefined) as number[];
                    dispatch({
                        type: FETCH_FAVORITES_SUCCESS,
                        payload: productIds,
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
};
