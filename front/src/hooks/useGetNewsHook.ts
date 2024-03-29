import { useEffect, useState } from 'react';

import { apiFetch } from '../axios/global';
import { News } from '../types/NewsType';

function useNewsList() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchNewsList() {
        try {
            const res: { data: { data: News[] } } = await apiFetch('/api/posts', {
                method: 'get',
            });
            setNewsList(res.data.data);
            setLoading(true);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNewsList().catch(e => console.error(e));
    }, []);

    return { newsList, loading };
}

export { useNewsList };
