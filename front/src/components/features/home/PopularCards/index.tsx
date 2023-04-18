import React from 'react';

import { useProductList } from '../../../../hooks/usePopularCardHook';
import PopularCard from './PopularCard';
import cn from './style.module.scss';

export default function PopularCards() {
    const { productList } = useProductList();
    return (
        <main className={cn.mainSection}>
            <h1 className={cn.mainSectionTitle}>Популярные товары</h1>
            <div className={cn.mainPopularCardsCatalog}>
                {productList.map(product => (
                    <PopularCard
                        key={product.id}
                        img={product.img}
                        id={product.id}
                        shortDesc={product.shortDesc}
                        quantity={product.quantity}
                        brand={product.brand}
                        title={product.title}
                        sale={product.sale}
                        price={product.price}
                    />
                ))}
            </div>
        </main>
    );
}
