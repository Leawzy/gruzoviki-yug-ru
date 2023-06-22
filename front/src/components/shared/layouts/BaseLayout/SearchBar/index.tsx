import { useRouter } from 'next/router';
import React, { useState } from 'react';

import cn from '../Header/style.module.scss';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await router.push(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <form className={cn.headerSearch} onSubmit={handleFormSubmit}>
            <input
                className={cn.headerSearchInput}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Что будем искать?"
            />
            <button type="submit" className={cn.headerSearchSubmit} />
        </form>
    );
}
