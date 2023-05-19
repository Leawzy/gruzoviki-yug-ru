import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

import { usePopularList } from '../../../../hooks/cards/usePopularCardHook';
import ProductCard from '../../../core/card/ProductCard';
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
                <Grid container wrap="nowrap">
                    {Array.from(new Array(4)).map((item, index) => (
                        <Box key={index} sx={{ width: 360, marginRight: 0.5 }}>
                            <Box sx={{ p: 2 }}>
                                <Skeleton variant="rectangular" width={242} height={180} />
                                <Skeleton sx={{ mt: 0.5 }} width="60%" />
                                <Skeleton sx={{ mt: 2 }} width="70%" />
                                <Skeleton width="60%" />
                                <Skeleton
                                    sx={{ mt: 2 }}
                                    variant="rectangular"
                                    width={242}
                                    height={60}
                                />
                            </Box>
                        </Box>
                    ))}
                </Grid>
            )}
        </main>
    );
}
