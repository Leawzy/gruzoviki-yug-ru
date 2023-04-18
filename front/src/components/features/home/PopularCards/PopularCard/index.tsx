import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    return (
        <div className={cn.shortCatalogItem} id={id}>
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
                <button className={cn.removeFromCart}>Убрать из корзины</button>
                <button className={cn.AddToCart}>Добавить в корзину</button>
            </div>
        </div>
    );
}
