import { useEffect, useState } from 'react';

import { apiFetch } from '../axios/global';
import { Product } from '../types/ProductType';

function usePopularList() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchPopularProductList() {
            try {
                const res: { data: { data: Product[] } } = await apiFetch('api/product/popular', {
                    method: 'get',
                });
                setProductList(res.data.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }

        fetchPopularProductList().catch(e => console.error(e));
    }, []);

    return { productList, loading };
}

export { usePopularList };
