import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

function CartHook() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || localStorage.setItem('cart', JSON.stringify([]))));
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem('cart');
        if (data) {
            setCart(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const newCart = [...cart];
        const existingItem = newCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            newCart.push({...item, quantity: 1});
        }
        setCart(newCart);
        setIsAddedToCart(true);
        localStorage.setItem(`cart-${item.id}`, JSON.stringify(true));
        localStorage.setItem('cart', JSON.stringify(newCart));
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        let data = cartItems.length
        dispatch({ type: 'UPDATE_NUMBER', payload: data });
    };

    const removeFromCart = (item) => {
        const newCart = [...cart];
        const existingItem = newCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity -= 1;
            if (existingItem.quantity === 0) {
                const index = newCart.indexOf(existingItem);
                newCart.splice(index, 1);
            }
            setCart(newCart);
            setIsAddedToCart(false);
            localStorage.removeItem(`cart-${item.id}`);
            localStorage.setItem('cart', JSON.stringify(newCart));
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            let data = cartItems.length
            dispatch({ type: 'UPDATE_NUMBER', payload: data });
        }
    };


    return {removeFromCart, addToCart}
}


export default CartHook;