import { useRouter } from 'next/router';
import React, { CSSProperties, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { RotateLoader } from 'react-spinners';

import { usePaginationProduct } from '../../../hooks/cards/usePaginationProductHook';
import { ProductCardIF } from '../../../types/ProductType';
import ProductCard from '../../core/card/ProductCard';
import BaseLayout from '../../shared/layouts/BaseLayout';
import CatalogFilter from './Filter';
import cn from './style.module.scss';

const override: CSSProperties = {
    margin: '22% 48%',
};

export default function Catalog() {
    const router = useRouter();
    const searchQuery = router.query.q as string;
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState({ brands: '', minPrice: 0, maxPrice: 0, categories: '' });
    const { products, pageCount } = usePaginationProduct(currentPage, filter, searchQuery);
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleFilterChange = (filters: {
        brands: string;
        minPrice: number;
        maxPrice: number;
        categories: string;
    }) => {
        setCurrentPage(0);
        setFilter(filters);
    };

    if (products.length === 0) {
        return (
            <RotateLoader cssOverride={override} color="#4c96e3" size={15} speedMultiplier={1} />
        );
    }

    const filteredProducts = products.filter((product: ProductCardIF) => {
        const { brands, minPrice, maxPrice, categories } = filter;
        return (
            (brands === '' || String(product.brand.id) === brands) &&
            (minPrice === 0 || product.price >= minPrice) &&
            (categories === '' || String(product?.category?.id) === categories) &&
            (maxPrice === 0 || product.price <= maxPrice)
        );
    });

    return (
        <BaseLayout>
            <section className={cn.categoryPage}>
                <div className={cn.categoryContainer}>
                    <div className={cn.categoryPageWrapper}>
                        <div className={cn.categoryPageFilter}>
                            <CatalogFilter onFilterChange={handleFilterChange} />
                        </div>
                        <div className={cn.categoryPageContent}>
                            {filteredProducts.length === 0 ? (
                                <p className={cn.nonFilterItem}>Товаров не найдено</p>
                            ) : (
                                <div className={cn.categoryPageContentWrapper}>
                                    {filteredProducts.map((product: ProductCardIF) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            slug={product.slug}
                                            title={product.title}
                                            shortDesc={product.shortDesc}
                                            img={product.img}
                                            quantity={product.quantity}
                                            brand={product.brand}
                                            sale={product.sale}
                                            price={product.price}
                                            art={product.art}
                                        />
                                    ))}
                                </div>
                            )}
                            {filteredProducts.length === 0 ? (
                                ''
                            ) : (
                                <ReactPaginate
                                    pageCount={pageCount}
                                    previousLabel="Назад"
                                    nextLabel="Дальше"
                                    onPageChange={handlePageClick}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
