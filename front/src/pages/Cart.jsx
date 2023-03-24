import React, {useEffect, useState} from 'react';
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";

import '../styles/base.scss'

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = localStorage.getItem('cart');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    function getTotalPrice (){
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice.toFixed();
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
                            </div>
                        ))}
                        <div>
                            <p>Общая сумма: {getTotalPrice()}</p>
                            <button>Оплатить</button>
                        </div>
                    </div>
                )}
            </>
        </BaseLayout>
    );
}

export default Cart;