import { useCallback, useEffect, useState } from 'react';

import { useGetFavoriteHook } from './useGetFavoriteHook';

export const useFavoriteStatus = (id: number) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { favoriteList } = useGetFavoriteHook();

    const checkIsFavorite = useCallback(() => {
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

    useEffect(() => {
        checkIsFavorite();
    }, [checkIsFavorite]);

    return { isFavorite, setIsFavorite };
};
