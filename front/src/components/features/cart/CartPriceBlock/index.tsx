import React from 'react';

import cn from './style.module.scss';

interface CartPriceBlockProps {
    totalPrice: number;
    totalCount: number;
}

export default function CartPriceBlock({ totalPrice, totalCount }: CartPriceBlockProps) {
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
            <div className={cn.cartPageDeliveryBtn}>
                <button>Оформить заказ</button>
            </div>
        </div>
    );
}
