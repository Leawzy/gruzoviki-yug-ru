import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../axios/global';
import { Product } from '../types/ProductType';

function useGetProductsHook() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: { data: Product[] } } = await adminFetch.get('/product/get');
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
