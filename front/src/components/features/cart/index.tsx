import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CartItem, RootState } from '../../../types/CartType';
import CartItemBlock from './CartItemBlock';
import CartPriceBlock from './CartPriceBlock';
import cn from './style.module.scss';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const items = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const totalPrice: number = items.reduce(
        (accumulator: number, product: CartItem) =>
            (accumulator + product.price) * product.quantity,
        0
    );

    return (
        <section className={cn.cartPage}>
            <div className={cn.cartPageContainer}>
                <h1 className={cn.cartPageTitle}>Корзина</h1>
                <div className={cn.cartPageWrapper}>
                    <div className={cn.cartPageLeft}>
                        {cartItems.map(cartItem => (
                            <CartItemBlock
                                id={cartItem.id}
                                key={cartItem.id}
                                title={cartItem.title}
                                img={cartItem.img}
                                price={cartItem.price}
                                quantity={cartItem.quantity}
                            />
                        ))}
                    </div>
                    <div className={cn.cartPageRight}>
                        <CartPriceBlock totalPrice={totalPrice} totalItems={items.length} />
                    </div>
                </div>
            </div>
        </section>
    );
}
