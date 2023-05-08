import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import ProductItem from '../../components/features/product/ProductItem';
import { ProductPage } from '../../types/ProductType';

function ProductPage() {
    const router = useRouter();
    const [product, setProduct] = useState<ProductPage[] | null>(null);
    const { productId } = router.query;

    useEffect(() => {
        async function getProductIdItem() {
            try {
                const res: { data: { data: ProductPage[] } } = await apiFetch(
                    `/api/product/card/${Number(productId)}`
                );
                setProduct(res.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        getProductIdItem().catch(error => console.error(error));
    }, []);

    if (!product) return <div>Загрузка товара...</div>;

    // @ts-ignore
    return <ProductItem product={product} />;
}

export default ProductPage;
