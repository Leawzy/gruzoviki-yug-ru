import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { MetaIF, Product } from '../../types/ProductType';

export const usePaginationProduct = (
    currentPage: number,
    filters: { brands: string; minPrice: number; maxPrice: number; categories: string }
) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let params = {};

                if (filters.brands !== '') {
                    params = { ...params, brand: filters.brands };
                }
                if (filters.categories !== '') {
                    params = { ...params, category: filters.categories };
                }
                if (filters.minPrice !== 0) {
                    params = { ...params, minPrice: filters.minPrice };
                }
                if (filters.maxPrice !== 0) {
                    params = { ...params, maxPrice: filters.maxPrice };
                }

                const res: {
                    data: {
                        meta: MetaIF;
                        data: Product[];
                    };
                } = await apiFetch(`api/product/list?page=${currentPage + 1}`, { params });
                setProducts(res.data.data);
                setPageCount(res.data.meta.last_page);
                setPerPage(res.data.meta.per_page);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts().catch(e => console.error(e));
    }, [currentPage, filters]);

    return {
        products,
        pageCount,
        perPage,
    };
};
