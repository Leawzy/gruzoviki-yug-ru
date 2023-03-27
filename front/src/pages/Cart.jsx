import React, {useEffect, useState} from 'react';
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";

import '../styles/base.scss'

import ProductCart from "../components/features/ProductCart/ProductCart.jsx";
import {Link} from "react-router-dom";

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
            totalPrice *= item.quantity;

        });
        return totalPrice.toFixed();
    }

    return (
        <BaseLayout>
            <>
                {cartItems.length === 0 ? (
                    <p>Корзина пустая</p>
                ) : (
                    <div className="shopping-cart">
                        <div className="title">
                            Shopping Bag
                        </div>
                        {
                            cartItems.map((item, index) => {
                                function deleteItemFromCart() {
                                    const updatedCart = cartItems.filter((items) => items.id !== item.id);
                                    setCartItems(updatedCart);
                                    if (updatedCart) {
                                        updatedCart.quantity -= 1;
                                        if (updatedCart.quantity === 0) {
                                            const index = cartItems.indexOf(updatedCart);
                                            cartItems.splice(index, 1);
                                        }
                                        localStorage.removeItem(`cart-${item.id}`);
                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    }
                                    let data = (cartItems.length - 1)
                                    dispatch({type: 'UPDATE_NUMBER', payload: data});
                                }

                                    return (
                                        <ProductCart
                                            key={index}
                                            id={item.id}
                                            lenght={cartItems.length}
                                            item={item.item}
                                            title={item.title}
                                            quantity={item.quantity}
                                            price={item.price}
                                            deleteItemFromCart={deleteItemFromCart}
                                            getTotalPrice={getTotalPrice}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                )}
            </>
            <div>
                <h2>Итог: {getTotalPrice()}</h2>
                {
                    Cookies.get('api_token') ? <button>Оплатить</button> : <Link to={'/login'}>Создайте аккаунт или Авторизируйтесь, чтобы оплатить</Link>
                }
            </div>
        </BaseLayout>
    );
}

export default Cart;