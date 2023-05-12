import React from 'react';

import ProductCard from '../components/core/card/ProductCard';
import BaseLayout from '../components/shared/layouts/BaseLayout';
import { useGetFavoriteHook } from '../hooks/favorites/useGetFavoriteHook';
import { Product } from '../types/ProductType';
import { withAuth } from '../utils/withAuth';

function FavoritePage() {
    const { favoriteList, loading } = useGetFavoriteHook();

    if (!loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <BaseLayout>
            <div>
                <h1>Избранный товар</h1>
                <div>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */}
                    {favoriteList?.products?.map((item: Product) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            shortDesc={item.shortDesc}
                            img={item.img}
                            quantity={item.quantity}
                            brand={item.brand}
                            sale={item.sale}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
}

export default withAuth(FavoritePage);
