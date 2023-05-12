import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { MetaIF, Product } from '../../types/ProductType';

export const usePaginationProduct = (currentPage: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res: {
                    data: {
                        meta: MetaIF;
                        data: Product[];
                    };
                } = await apiFetch(`api/product/list/${currentPage}`);
                setProducts(res.data.data);
                setPageCount(res.data.meta.last_page);
                setPerPage(res.data.meta.per_page);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts().catch(e => console.error(e));
    }, [perPage, currentPage]);

    return {
        products,
        pageCount,
    };
};
