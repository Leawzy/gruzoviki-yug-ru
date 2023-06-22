import React from 'react';

import { usePopularList } from '../../../../hooks/cards/usePopularCardHook';
import ProductCard from '../../../core/card/ProductCard';
import PopularSkeleton from '../../../core/skeletonts/PopularSkeleton';
import cn from './style.module.scss';

export default function PopularCards() {
    const { productList, loading } = usePopularList();

    return (
        <main className={cn.mainSection}>
            <h1 className={cn.mainSectionTitle}>Популярные товары</h1>
            {loading === true ? (
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
            ) : (
                <PopularSkeleton />
            )}
        </main>
    );
}
