import React, { CSSProperties } from 'react';
import { RotateLoader } from 'react-spinners';

import ProductCard from '../components/core/card/ProductCard';
import BaseLayout from '../components/shared/layouts/BaseLayout';
import { useGetFavoriteHook } from '../hooks/favorites/useGetFavoriteHook';
import { Product } from '../types/ProductType';
import { withAuth } from '../utils/withAuth';

const override: CSSProperties = {
    margin: '22% 48%',
};

function FavoritePage() {
    const { favoriteList, loading } = useGetFavoriteHook();

    if (!loading) {
        return (
            <RotateLoader cssOverride={override} color="#4c96e3" size={15} speedMultiplier={1} />
        );
    }

    return (
        <BaseLayout>
            <div>
                <div className="favoriteTitle">
                    <h1>Избранный товар</h1>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    <p>Всего в избранном: {favoriteList?.products?.length}</p>
                </div>
                <div className="favoriteWrapper">
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
                            art={item.art}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
}

export default withAuth(FavoritePage);
