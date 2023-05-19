import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CartItem, RootState } from '../../../types/CartType';
import { CartItemBlock } from './CartItemBlock';
import CartPriceBlock from './CartPriceBlock';
import cn from './style.module.scss';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const items = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        setCartItems(items);
    }, [items]);

    return (
        <section className={cn.cartPage}>
            <div className={cn.cartPageContainer}>
                <h1 className={cn.cartPageTitle}>Корзина</h1>
                <div className={cn.cartPageWrapper}>
                    <div className={cn.cartPageLeft}>
                        {cartItems.length === 0 ? (
                            <p className={cn.noneCart}>Корзина пустая</p>
                        ) : (
                            cartItems.map(cartItem => (
                                <CartItemBlock
                                    id={cartItem.id}
                                    maxQuantity={cartItem.maxQuantity}
                                    key={cartItem.id}
                                    title={cartItem.title}
                                    img={cartItem.img}
                                    price={cartItem.price}
                                    quantity={cartItem.quantity}
                                    art={cartItem.art}
                                />
                            ))
                        )}
                    </div>
                    <div className={cn.cartPageRight}>
                        <CartPriceBlock />
                    </div>
                </div>
            </div>
        </section>
    );
}
