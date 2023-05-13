import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { MetaIF, Product } from '../../types/ProductType';

export const usePaginationProduct = (
    currentPage: number,
    filters: { brand: string; minPrice: number; maxPrice: number }
) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [perPage, setPerPage] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res: {
                    data: {
                        meta: MetaIF;
                        data: Product[];
                    };
                } = await apiFetch(`api/product/list?page=${currentPage}`, { params: filters });
                setProducts(res.data.data);
                setPerPage(res.data.meta.per_page);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts().catch(e => console.error(e));
    }, [currentPage, filters]);

    return {
        products,
        pageCount: Math.ceil(products.length / perPage),
    };
};
