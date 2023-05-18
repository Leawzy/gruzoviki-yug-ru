import React, { useState } from 'react';

import { apiFetch } from '../../../../axios/global';
import cn from './style.module.scss';

interface CartPriceBlockProps {
    totalPrice: number;
    totalCount: number;
    cartItems: object;
}

export default function CartPriceBlock({ totalPrice, totalCount, cartItems }: CartPriceBlockProps) {
    const [delivery, setDelivery] = useState('Cамовывоз');
    const [payMethod, setPayMethod] = useState('Наличными');

    async function handleSubmitCart() {
        try {
            const res = await apiFetch('api/order/create', {
                method: 'post',
                data: {
                    products: cartItems,
                    total: totalPrice,
                    delivery,
                    paymentMethod: payMethod,
                    status: 'В обработке',
                },
            });
            if (res.status === 200) {
                localStorage.removeItem('cartItems');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={cn.cartPageInfo}>
            <div className={cn.cartPageTotalPrice}>
                <p>Итого</p>
                <p>{totalPrice} ₽</p>
            </div>
            <div className={cn.cartPageTotalItem}>
                <p>Количество</p>
                <p>{totalCount} шт.</p>
            </div>
            <div className={cn.cartPageTotalItem}>
                <p>Доставка</p>
                <p>Бесплатна</p>
            </div>
            <div className={cn.cartPageType}>
                <p>Выбор вида оплаты</p>
                <label>
                    <input
                        type="radio"
                        value="Наличными"
                        name="pay"
                        checked
                        onChange={event => setPayMethod(event.target.value)}
                    />
                    Наличными при получении
                </label>
                <label>
                    <input
                        type="radio"
                        value="Безналичными"
                        name="pay"
                        checked={payMethod === 'Безналичными'}
                        onChange={event => setPayMethod(event.target.value)}
                    />
                    Безналичными при получении
                </label>
            </div>
            <div className={cn.cartPageType}>
                <p>Выберите способ получения</p>
                <label>
                    <input
                        type="radio"
                        value="Cамовывоз"
                        name="delivery"
                        checked
                        onChange={event => setDelivery(event.target.value)}
                    />
                    Cамовывоз
                </label>
                <label>
                    <input
                        type="radio"
                        value="Курьером"
                        name="delivery"
                        checked={delivery === 'Курьером'}
                        onChange={event => setDelivery(event.target.value)}
                    />
                    Курьером
                </label>
            </div>
            <div className={cn.cartPageDeliveryBtn}>
                <button onClick={handleSubmitCart}>Оформить заказ</button>
            </div>
        </div>
    );
}
