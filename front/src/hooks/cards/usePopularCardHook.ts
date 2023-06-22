import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { ProductCardIF } from '../../types/ProductType';

function usePopularList() {
    const [productList, setProductList] = useState<ProductCardIF[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPopularProductList() {
            try {
                const res: { data: { data: ProductCardIF[] } } = await apiFetch(
                    'api/product/popular',
                    {
                        method: 'get',
                    }
                );
                setProductList(res.data.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }

        fetchPopularProductList().catch(e => console.error(e));

        const interval = setInterval(() => {
            fetchPopularProductList().catch(e => console.error(e));
        }, 85000);

        return () => clearInterval(interval);
    }, []);

    return { productList, loading };
}

export { usePopularList };
