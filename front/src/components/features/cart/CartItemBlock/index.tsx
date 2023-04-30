import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeFromCart } from '../../../../redux/actions';
import cn from './style.module.scss';

interface CartItemBlock {
    id: number;
    title: string;
    price: number;
    quantity: number;
    img?: string;
}

export default function CartItemBlock({ title, img, price, quantity, id }: CartItemBlock) {
    const [itemAmount, setItemAmount] = useState(quantity);
    const dispatch = useDispatch();

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(id));
    };

    const plusQuantity = () => {
        setItemAmount(itemAmount + 1);
    };

    const minusQuantity = () => {
        setItemAmount(itemAmount - 1);
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
                    <p className={cn.cartPageItemCode}>article</p>
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
