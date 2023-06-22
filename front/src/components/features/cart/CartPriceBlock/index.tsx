import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../../../axios/global';
import { ProductCardIF } from '../../../../types/ProductType';
import { getToken } from '../../../../utils/getToken';
import cn from './style.module.scss';

export default function CartPriceBlock() {
    const [delivery, setDelivery] = useState('Cамовывоз');
    const [payMethod, setPayMethod] = useState('Наличными');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [token, setToken] = useState('');
    // @ts-ignore
    const cart: ProductCardIF[] =
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems') || '[]') : [];
    const route = useRouter();

    useEffect(() => {
        setToken(getToken());
    }, []);

    useEffect(() => {
        let totalCount = 0;
        let totalPrice = 0;

        const updateCartData = () => {
            cart.forEach(item => {
                totalCount += item.quantity;
                totalPrice += item.price * item.quantity;
            });
            setCount(totalCount);
            setPrice(totalPrice);
        };

        updateCartData();

        const interval = setInterval(updateCartData, 100);

        return () => {
            clearInterval(interval);
        };
    }, [cart]);

    async function handleSubmitCart() {
        try {
            setIsSubmitting(true);
            const res = await apiFetch('api/order/create', {
                method: 'post',
                data: {
                    products: cart,
                    total: price,
                    delivery,
                    paymentMethod: payMethod,
                    status: 'В обработке',
                },
            });
            if (res.status === 200) {
                localStorage.removeItem('cartItems');
                await route.push('/payment');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={cn.cartPageInfo}>
            <div className={cn.cartPageTotalPrice}>
                <p>Итого</p>
                <p>{price} ₽</p>
            </div>
            <div className={cn.cartPageTotalItem}>
                <p>Количество</p>
                <p>{count} шт.</p>
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
                {cart.length === 0 || token === undefined ? (
                    <button disabled onClick={handleSubmitCart}>
                        Оформить заказ
                    </button>
                ) : (
                    <button disabled={isSubmitting === true} onClick={handleSubmitCart}>
                        Оформить заказ
                    </button>
                )}
            </div>
            <div>
                {token === undefined ? (
                    <p className={cn.cartTextError}>
                        Чтобы оформить заказ, вам требуется{' '}
                        <Link href="/authorization">Авторизоваться</Link>
                    </p>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
