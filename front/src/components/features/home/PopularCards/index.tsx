import React from 'react';

import { usePopularList } from '../../../../hooks/cards/usePopularCardHook';
import ProductCard from '../../../core/card/ProductCard';
import SkeletonCard from './SkeletonContainer';
import cn from './style.module.scss';

export default function PopularCards() {
    const { productList, loading } = usePopularList();

    if (!loading) {
        productList.map(item => (
            <div key={item.id}>
                <SkeletonCard />
            </div>
        ));
    }

    return (
        <main className={cn.mainSection}>
            <h1 className={cn.mainSectionTitle}>Популярные товары</h1>
            <div className={cn.mainPopularCardsCatalog}>
                {productList.map(product => (
                    <ProductCard
                        key={product.id}
                        img={product.img}
                        id={product.id}
                        slug={product.slug}
                        shortDesc={product.shortDesc}
                        quantity={product.quantity}
                        brand={product.brand}
                        title={product.title}
                        sale={product.sale}
                        price={product.price}
                        art={product.art}
                    />
                ))}
            </div>
        </main>
    );
}
