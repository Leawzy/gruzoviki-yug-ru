import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
    addToCart,
    addToFavorites,
    fetchFavorites,
    removeFromCart,
    removeFromFavorites,
} from '../../redux/actions';
import { RootState } from '../../types/CartType';
import { ProductPage } from '../../types/ProductType';

interface ProductItemIF {
    id: number;
    product: ProductPage;
}

export const useProductItem = ({ product }: ProductItemIF) => {
    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useSelector((state: RootState) => state.favorites);
    const cookies = parseCookies();
    const { property, category } = product;
    const categoryProperties = category.property;
    const { token } = cookies;

    useEffect(() => {
        if (token) {
            // @ts-ignore
            dispatch(fetchFavorites());
        }
    }, [dispatch, token]);

    useEffect(() => {
        // @ts-ignore
        setIsFavorite(favorites.some(item => item.id.toString() === product.id.toString()));
    }, [favorites, product.id]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as ProductPage[];
        const item = cartItems.find((item: ProductPage) => item.id === product.id);
        if (item) {
            setAddedToCart(true);
        }
    }, [product.id]);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            // @ts-ignore
            dispatch(removeFromFavorites(product.id));
        } else {
            // @ts-ignore
            dispatch(addToFavorites(product.id));
        }

        setTimeout(() => {
            setIsFavorite(!isFavorite);
        }, 500);
    };

    const handleAddToCart = () => {
        setAddedToCart(true);
        dispatch(
            addToCart(
                product.id,
                product.title,
                product.price,
                product.img,
                Boolean(true),
                product.quantity,
                itemCount,
                product.art
            )
        );
    };

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(product.id));
        setAddedToCart(false);
    };

    const setPlusHandler = () => {
        setItemCount(prevCount => {
            const incrementedCount = prevCount + 1;
            return incrementedCount <= Number(product.quantity)
                ? incrementedCount
                : Number(product.quantity);
        });
    };

    const setMinusHandler = () => {
        setItemCount(prevCount => {
            const decrementedCount = prevCount - 1;
            return decrementedCount >= 1 ? decrementedCount : 1;
        });
    };

    const propertyStrings = Object.keys(categoryProperties)
        .filter(key => key in property)
        .map(key => `${categoryProperties[key]} ${property[key]}`);

    const copyLinkOfProduct = async () => {
        const cpLink = window.location.href;
        await navigator.clipboard.writeText(cpLink);
        toast.success('🔗 Ссылка успешно скопирована!');
    };

    return {
        itemCount,
        addedToCart,
        isFavorite,
        propertyStrings,
        handleToggleFavorite,
        handleAddToCart,
        handleRemoveToCart,
        setPlusHandler,
        setMinusHandler,
        copyLinkOfProduct,
    };
};
