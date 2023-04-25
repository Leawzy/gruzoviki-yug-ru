import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useCartStore } from '../../../../../mobx/CartStore/CartStoreContext';
import { Product } from '../../../../../types/ProductType';
import cn from './style.module.scss';

export default function PopularCard({
    id,
    brand,
    quantity,
    img,
    price,
    title,
    shortDesc,
}: Product) {
    const [addedToCart, setAddedToCart] = React.useState(false);
    const store = useCartStore();

    const handleAddToCart = () => {
        store.addItem({ id, title, price, quantity: 1 });
        setAddedToCart(true);
    };

    const handleRemoveFromCart = () => {
        store.removeItem(id);
        setAddedToCart(false);
    };

    return (
        <article className={cn.shortCatalogItem} id={String(id)}>
            <Link href={`/products/${id}`} className={cn.shortCatalogItemLink}>
                <div className={cn.shortCatalogItemLeftInfo}>
                    <span className={cn.shortCatalogBrand}>{`Бренд: ${brand}`}</span>
                </div>
                <div className={cn.shortCatalogItemRightInfo}>
                    <span className={cn.shortCatalogAmount}>{`Количество: ${quantity} шт.`}</span>
                </div>
                <Image
                    src={img}
                    alt="Catalog Img"
                    width={555}
                    height={410}
                    className={cn.catalogImage}
                />
            </Link>
            <div className={cn.shortCatalogPrice}>
                <p className={cn.shortCatalogPriceNum}>{`${price} ₽`}</p>
            </div>
            <div className={cn.shortCatalogTitle}>
                <a className={cn.shortCatalogTitleText}>{title}</a>
                <p>{shortDesc}</p>
            </div>
            <div className={cn.shortButtons}>
                {addedToCart ? (
                    <button className={cn.removeFromCart} onClick={handleRemoveFromCart}>
                        Убрать из корзины
                    </button>
                ) : (
                    <button className={cn.AddToCart} onClick={handleAddToCart}>
                        Добавить в корзину
                    </button>
                )}
            </div>
        </article>
    );
}
