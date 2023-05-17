import { useEffect, useState } from 'react';

import { useGetFavoriteHook } from './useGetFavoriteHook';

export function useFavoriteStatus(id: number) {
    const { favoriteList } = useGetFavoriteHook();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (favoriteList) {
            if (Array.isArray(favoriteList.products)) {
                favoriteList.products.forEach(item => {
                    // @ts-ignore
                    if (item && typeof item.id === 'number' && item.id === id) {
                        setIsFavorite(true);
                    }
                });
            }
        }
    }, [favoriteList, id]);

    return { isFavorite, setIsFavorite };
}
