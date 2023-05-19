import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeFromCart } from '../../../../redux/actions';
import { CartItem } from '../../../../types/CartType';
import cn from './style.module.scss';

interface CartItemBlock {
    id: number;
    title: string;
    price: number;
    quantity: number;
    img?: string;
    maxQuantity: number;
    art: string;
}

function CartItemBlock({ title, img, price, quantity, id, art, maxQuantity }: CartItemBlock) {
    const [itemAmount, setItemAmount] = useState(quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const updatedCartItems: CartItem[] = cartItems.map((item: CartItem) => {
            if (item.id === id) {
                return { ...item, quantity: itemAmount };
            }
            return item;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }, [id, itemAmount]);

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(id));
    };

    const plusQuantity = () => {
        setItemAmount(prevAmount => {
            const newAmount = prevAmount + 1;
            return newAmount > maxQuantity ? maxQuantity : newAmount;
        });
    };

    const minusQuantity = () => {
        setItemAmount(prevAmount => {
            const newAmount = prevAmount - 1;
            return newAmount < 1 ? quantity : newAmount;
        });
    };

    return (
        <div className={cn.cartPageItem}>
            <div className={cn.cartPageItemLeft}>
                <div className={cn.cartPageItemImage}>
                    <Link href={`/products/${id}`}>
                        <Image
                            className={cn.cartPageItemImg}
                            width={121}
                            height={121}
                            src={img as string}
                            alt="Image in Cart"
                        />
                    </Link>
                </div>
                <div className={cn.cartPageItemContent}>
                    <h2 className={cn.cartPageItemTitle}>
                        <Link href={`/products/${id}`}>{title}</Link>
                    </h2>
                    <p className={cn.cartPageItemCode}>Артикул: {art}</p>
                </div>
            </div>
            <div className={cn.cartPageItemRight}>
                <div className={cn.cartPageItemRightNum}>
                    <button onClick={minusQuantity} className={cn.cartPageItemRightMinus}>
                        -
                    </button>
                    <div className={cn.cartPageItemRightInput}>
                        <input type="text" value={itemAmount} onChange={e => e.target.value} />
                    </div>
                    <button onClick={plusQuantity} className={cn.cartPageItemRightPlus}>
                        +
                    </button>
                </div>
                <div className={cn.cartPageItemRightPrice}>
                    <p>{price} ₽</p>
                    <button onClick={handleRemoveToCart}>Удалить</button>
                </div>
            </div>
        </div>
    );
}

export { CartItemBlock };
