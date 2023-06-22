import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { ProductIF } from '../../types/ProductType';

function useProductList() {
    const [productList, setProductList] = useState<ProductIF[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchProductList() {
            try {
                const res: {
                    data: {
                        data: ProductIF[];
                    };
                } = await apiFetch('api/product/list', {
                    method: 'get',
                });
                setProductList(res.data.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }

        fetchProductList().catch(e => console.error(e));

        const interval = setInterval(() => {
            fetchProductList().catch(e => console.error(e));
        }, 85000);

        return () => clearInterval(interval);
    }, []);

    return { productList, loading };
}

export { useProductList };
