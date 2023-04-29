import React, { useEffect, useState } from 'react';

import { useCartStore } from '../../../mobx/CartStore/CartStoreContext';
import { CartItem } from '../../../types/CartType';
import CartItemBlock from './CartItemBlock';
import CartPriceBlock from './CartPriceBlock';
import cn from './style.module.scss';

export default function Cart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const { getItemStore } = useCartStore();

    function getAll() {
        const itemTitles = getItemStore()?.map(e => e);
        setItems(itemTitles);
    }

    const totalPrice: number = items.reduce(
        (accumulator: number, product: CartItem) =>
            (accumulator + product.price) * product.quantity,
        0
    );

    useEffect(() => {
        getAll();
    }, []);

    return (
        <section className={cn.cartPage}>
            <div className={cn.cartPageContainer}>
                <h1 className={cn.cartPageTitle}>Корзина</h1>
                <div className={cn.cartPageWrapper}>
                    <div className={cn.cartPageLeft}>
                        {items.map(cartItem => (
                            <CartItemBlock
                                id={cartItem.id}
                                key={cartItem.id}
                                title={cartItem.title}
                                img={cartItem.img}
                                price={cartItem.price}
                                maxQuantity={cartItem.maxQuantity}
                                quantity={cartItem.quantity}
                            />
                        ))}
                    </div>
                    <div className={cn.cartPageRight}>
                        <CartPriceBlock totalItems={items.length} totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </section>
    );
}
