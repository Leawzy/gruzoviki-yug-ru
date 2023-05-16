import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { usePaginationProduct } from '../../../hooks/cards/usePaginationProductHook';
import { Product } from '../../../types/ProductType';
import ProductCard from '../../core/card/ProductCard';
import BaseLayout from '../../shared/layouts/BaseLayout';
import CatalogFilter from './Filter';
import cn from './style.module.scss';

export default function Catalog() {
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState({ brands: '', minPrice: 0, maxPrice: 0 });
    const { products, pageCount } = usePaginationProduct(currentPage, filter);
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleFilterChange = (filters: {
        brands: string;
        minPrice: number;
        maxPrice: number;
    }) => {
        setCurrentPage(0);
        setFilter(filters);
    };

    if (products.length === 0) {
        return <div>Загрузка...</div>;
    }

    const filteredProducts = products.filter((product: Product) => {
        const { brands, minPrice, maxPrice } = filter;
        return (
            (brands === '' || String(product.brand.id) === brands) &&
            (minPrice === 0 || product.price >= minPrice) &&
            (maxPrice === 0 || product.price <= maxPrice)
        );
    });

    return (
        <BaseLayout>
            <section className={cn.categoryPage}>
                <div className={cn.categoryContainer}>
                    <h1 className={cn.categoryPageTitle}>1</h1>
                    <div className={cn.categoryPageWrapper}>
                        <div className={cn.categoryPageFilter}>
                            <CatalogFilter onFilterChange={handleFilterChange} />
                        </div>
                        <div className={cn.categoryPageContent}>
                            {filteredProducts.length === 0 ? (
                                <p className={cn.nonFilterItem}>Товаров не найдено</p>
                            ) : (
                                <div className={cn.categoryPageContentWrapper}>
                                    {filteredProducts.map((product: Product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            title={product.title}
                                            shortDesc={product.shortDesc}
                                            img={product.img}
                                            quantity={product.quantity}
                                            brand={product.brand}
                                            sale={product.sale}
                                            price={product.price}
                                            art={product.art}
                                            description={product.description}
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
