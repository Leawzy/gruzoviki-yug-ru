import React, { useEffect, useState } from 'react';

import cn from './style.module.scss';

interface CartPriceBlockProps {
    totalItems: number;
    totalPrice: number;
}

export default function CartPriceBlock({ totalItems, totalPrice }: CartPriceBlockProps) {
    const [sale, setSale] = useState(0);
    const [saleAmount, setSaleAmount] = useState(0);

    useEffect(() => {
        if (totalPrice > 28000) {
            setSale((totalPrice / 100) * 2);
            setSaleAmount(2);
        } else if (totalPrice > 45000) {
            setSale((totalPrice / 100) * 5);
            setSaleAmount(5);
        } else if (totalPrice > 100000) {
            setSale((totalPrice / 100) * 10);
            setSaleAmount(10);
        }
    }, [totalPrice]);

    return (
        <div className={cn.cartPageInfo}>
            <div className={cn.cartPageTotalPrice}>
                <p>Итого</p>
                <p>{totalPrice - sale} ₽</p>
            </div>
            <div className={cn.cartPageTotalItem}>
                <p>Товаров, {totalItems} шт.</p>
                <p>{totalPrice} ₽</p>
            </div>
            <div className={cn.cartPageTotalItem}>
                {saleAmount === 0 ? <p>Скидка</p> : <p>Скидка {saleAmount}%</p>}
                {sale === 0 ? (
                    <p>Отсуствует</p>
                ) : (
                    <p className={cn.cartPageTotalItemSale}>{sale} ₽</p>
                )}
            </div>
            <div className={cn.cartPageTotalItem}>
                <p>Доставка</p>
                <p>Бесплатна</p>
            </div>
            <div className={cn.cartPageDeliveryBtn}>
                <button>Оформить заказ</button>
            </div>
        </div>
    );
}
