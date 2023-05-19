import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { MetaIF, ProductCardIF } from '../../types/ProductType';

export const usePaginationProduct = (
    currentPage: number,
    filters: { brands: string; minPrice: number; maxPrice: number; categories: string },
    searchQuery: string
) => {
    const [products, setProducts] = useState<ProductCardIF[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

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
                        data: ProductCardIF[];
                    };
                } = await apiFetch(
                    `api/product/list?page=${currentPage + 1}&q=${
                        searchQuery === undefined ? '' : searchQuery
                    }`,
                    {
                        params,
                    }
                );
                setProducts(res.data.data);
                setPageCount(res.data.meta.last_page);
                setPerPage(res.data.meta.per_page);
                setTotalItems(res.data.meta.total);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts().catch(e => console.error(e));
    }, [currentPage, filters, searchQuery, totalItems]);

    return {
        products,
        pageCount,
        perPage,
        totalItems,
    };
};
