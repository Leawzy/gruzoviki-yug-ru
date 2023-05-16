import React, { useState } from 'react';

import { useGetBrandHook } from '../../../../hooks/admin/useGetBrandHook';
import cn from './style.module.scss';

interface Props {
    onFilterChange: (filters: { brands: string; minPrice: number; maxPrice: number }) => void;
}

export default function CatalogFilter({ onFilterChange }: Props) {
    const { brand } = useGetBrandHook();
    const [brands, setBrands] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleBrandFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const brand = event.target.value;
        setBrands(brand);
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
        onFilterChange({ brands, minPrice, maxPrice });
    };

    const handleFilterClear = () => {
        onFilterChange({ brands: '', minPrice: 0, maxPrice: 0 });
        setBrands('');
        setMinPrice(0);
        setMaxPrice(0);
    };

    return (
        <div className={cn.filterContainer}>
            <h3>Фильтры</h3>
            <div className={cn.filterGroup}>
                <label>Бренд</label>
                <select onChange={handleBrandFilterChange}>
                    <option value="none" disabled selected>
                        Выберите бренд
                    </option>
                    {brand.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
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
            <button onClick={handleFilterClear}>Очистить фильтр</button>
        </div>
    );
}
