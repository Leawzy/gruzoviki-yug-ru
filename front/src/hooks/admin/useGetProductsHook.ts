import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { ProductIF } from '../../types/ProductType';

function useGetProductsHook() {
    const [products, setProducts] = useState<ProductIF[]>([]);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: { data: ProductIF[] } } = await adminFetch.get('/product/get');
                setProducts(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        getProfile().catch(e => console.error(e));
    }, []);

    return { products };
}

export { useGetProductsHook };
