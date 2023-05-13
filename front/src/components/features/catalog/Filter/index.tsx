import React, { useState } from 'react';

import cn from './style.module.scss';

interface Props {
    onFilterChange: (filters: { brand: string; minPrice: number; maxPrice: number }) => void;
}

export default function CatalogFilter({ onFilterChange }: Props) {
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleBrandFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const brand = event.target.value;
        setBrand(brand);
    };

    const handleMinPriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minPrice = parseFloat(event.target.value);
        setMinPrice(minPrice);
    };

    const handleMaxPriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = parseFloat(event.target.value);
        setMaxPrice(maxPrice);
    };

    const handleFilterClick = () => {
        onFilterChange({ brand, minPrice, maxPrice });
    };

    return (
        <div className={cn.filterContainer}>
            <h3>Фильтры</h3>
            <div className={cn.filterGroup}>
                <label>Бренд</label>
                <input type="text" value={brand} onChange={handleBrandFilterChange} />
            </div>
            <div className={cn.filterGroup}>
                <label>Минимальная цена</label>
                <input type="number" value={minPrice} onChange={handleMinPriceFilterChange} />
            </div>
            <div className={cn.filterGroup}>
                <label>Максимальная цена</label>
                <input type="number" value={maxPrice} onChange={handleMaxPriceFilterChange} />
            </div>
            <button onClick={handleFilterClick}>Применить фильтр</button>
        </div>
    );
}
