import { useEffect, useState } from 'react';

import { apiFetch } from '../axios/global';

function useProductList() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        async function fetchProductList() {
            try {
                const res = await apiFetch('/api/product_list', { method: 'get' });
                setProductList(res.data.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchProductList();
    }, []);

    return { productList };
}

export { useProductList };
