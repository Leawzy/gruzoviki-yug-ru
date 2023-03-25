import React, {useEffect, useState} from 'react';
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import {useDispatch} from "react-redux";

import '../styles/base.scss'

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const items = localStorage.getItem('cart');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    function getTotalPrice() {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice.toFixed();
    }

    function getTotalItems() {
        return cartItems.length
    }

    return (
        <BaseLayout>
            <>
                {cartItems.length === 0 ? (
                    <p>Корзина пустая</p>
                ) : (
                    <div className={'cart'}>
                        <h1>Ваши Заказы</h1>
                        {cartItems.map((item) => (
                            <div key={item.id} className={'cart__wrapper'}>
                                <p className={'cart__title'}>{item.title}</p>
                                <p className={'cart__price'}>Цены: {item.price}</p>
                                <p className={'cart__quantity'}>Количество: {item.quantity}</p>
                                <button onClick={() => {
                                    const updatedCart = cartItems.filter((items) => items.id !== item.id);
                                    setCartItems(updatedCart);
                                    if(updatedCart) {
                                        updatedCart.quantity -= 1;
                                        if (updatedCart.quantity === 0) {
                                            const index = cartItems.indexOf(updatedCart);
                                            cartItems.splice(index, 1);
                                        }
                                        localStorage.removeItem(`cart-${item.id}`);
                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    }
                                    let data = (cartItems.length - 1)
                                    dispatch({ type: 'UPDATE_NUMBER', payload: data });
                                    }}>Удалить</button>
                            </div>
                        ))}
                        <div>
                            <p>Общая сумма: {getTotalPrice()} | Общее количество позиций: {getTotalItems()}</p>
                            <button>Оплатить</button>
                        </div>
                    </div>
                )}
            </>
        </BaseLayout>
    );
}

export default Cart;