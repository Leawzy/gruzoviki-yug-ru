import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import Preloader from '../../components/core/loaders/Preloader';
import ProductItem from '../../components/features/product/ProductItem';
import { ProductPage } from '../../types/ProductType';

function ProductPage() {
    const router = useRouter();
    const [product, setProduct] = useState<ProductPage[] | null>(null);
    const { productSlug } = router.query;

    useEffect(() => {
        async function getProductByIdItem() {
            try {
                const slugParts = (productSlug as string)?.split('-');
                const productId = slugParts?.[0];

                if (productId) {
                    const res: { data: { data: ProductPage[] } } = await apiFetch(
                        `/api/product/card/${Number(productId)}`
                    );
                    setProduct(res.data.data);
                }
            } catch (e) {
                console.error(e);
            }
        }

        getProductByIdItem().catch(error => console.error(error));
    }, [productSlug]);

    if (!product) return <Preloader />;

    // @ts-ignore
    return <ProductItem product={product} />;
}

export default ProductPage;
