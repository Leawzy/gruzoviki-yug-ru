import React, { useEffect, useState } from 'react';
import './mainLayout.scss';
import Card from './Card/index.jsx';
import Skeleton from './SkeletonCards/skeleton.jsx';
import useProductList from '../../../../../hooks/useFetchHook.js';

function NewCard() {
    const { isLoading, error, data } = useProductList();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || []));

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
            newCart.push({ ...item, quantity: 1 });
        }
        setCart(newCart);
        item.clicked = true; // Mark the item as clicked
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
            item.clicked = false; // Mark the item as not clicked
        }
    };

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <div className="index-catalog">
            <h3>Популярный товар</h3>
            <div className="short-catalog__wrapper">
                {data.map((item, index) => {
                    const isClicked = item.clicked || false; // Check if the item has been clicked
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
                            isClicked={isClicked} // Pass the isClicked property to the Card component
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default NewCard;
