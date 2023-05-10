import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect, useState } from 'react';
import { RotateLoader } from 'react-spinners';

import { apiFetch } from '../../axios/global';
import ProductItem from '../../components/features/product/ProductItem';
import { ProductPage } from '../../types/ProductType';

const override: CSSProperties = {
    margin: '22% 48%',
};

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
    }, [productId]);

    if (!product)
        return (
            <RotateLoader cssOverride={override} color="#4c96e3" size={15} speedMultiplier={1} />
        );

    // @ts-ignore
    return <ProductItem product={product} />;
}

export default ProductPage;
