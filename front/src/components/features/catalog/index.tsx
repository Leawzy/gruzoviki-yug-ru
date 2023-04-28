import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { usePaginationProduct } from '../../../hooks/usePaginationProductHook';
import ProductCard from '../../core/card/ProductCard';
import BaseLayout from '../../shared/layouts/BaseLayout';
import CatalogFilter from './Filter';
import cn from './style.module.scss';

export default function Catalog() {
    const [currentPage, setCurrentPage] = useState(0);
    const { products, pageCount } = usePaginationProduct(currentPage);

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <BaseLayout>
            <section className={cn.categoryPage}>
                <div className={cn.categoryContainer}>
                    <h1 className={cn.categoryPageTitle}>1</h1>
                    <div className={cn.categoryPageWrapper}>
                        <div className={cn.categoryPageFilter}>
                            <CatalogFilter />
                        </div>
                        <div className={cn.categoryPageContent}>
                            <div className={cn.categoryPageContentWrapper}>
                                {products.map(product => (
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
                                    />
                                ))}
                            </div>
                            <ReactPaginate
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
