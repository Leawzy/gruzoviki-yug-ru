import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../../axios/global';
import { FavoriteTypeIF } from '../../types/FavoriteType';

function useGetFavoriteHook() {
    const [favoriteList, setFavoriteList] = useState<FavoriteTypeIF | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAuthToken();
        async function fetchFavoriteList() {
            try {
                const res: { data: { data: FavoriteTypeIF } } = await apiFetch('api/featured/get', {
                    method: 'get',
                });
                setFavoriteList(res.data.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }

        fetchFavoriteList().catch(e => console.error(e));
    }, []);

    return { favoriteList, loading };
}

export { useGetFavoriteHook };
