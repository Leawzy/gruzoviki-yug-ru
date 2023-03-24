import React, {useEffect, useState} from 'react';
import './mainLayout.scss';
import Card from './Card/index.jsx';
import Skeleton from './SkeletonCards/skeleton.jsx';
import useProductList from '../../../hooks/useFetchHook.js';
import Header from "../../shared/layouts/BaseLayout/HeaderLayout/Header/header/index.jsx";

let result = 0;
function Count(count) {
    let data = count;
    result = data;
}

console.log(result);

export const CountContext = React.createContext(8);

function NewCard() {
    const {isLoading, error, data} = useProductList();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || localStorage.setItem('cart', JSON.stringify([]))));
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [count, setCount] = useState(0);

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
        setCount(data)
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
            setCount(data)
        }
    };
    if (isLoading) {
        return <Skeleton/>;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }
    Count(5)
    return (
        <div className="index-catalog">
            <h3>Популярный товар</h3>
            <div className="short-catalog__wrapper">
                {data.map((item, index) => {
                    const addedToCart = localStorage.getItem(`cart-${item.id}`) === 'true';
                    return (
                        <Card
                            key={index}
                            id={item.id}
                            short_desc={item.short_desc}
                            quantity={item.quantity}
                            brand={item.brand}
                            title={item.title}
                            sale={item.sale}
                            price={item.price}
                            addToCart={() => addToCart(item)}
                            removeFromCart={() => removeFromCart(item)}
                            isAddedToCart={addedToCart}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default NewCard;
