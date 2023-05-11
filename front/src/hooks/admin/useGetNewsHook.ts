import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { News } from '../../types/NewsType';

function useGetNewsHook() {
    const [news, setNews] = useState<News[]>([]);
    useEffect(() => {
        const getNews = async () => {
            setAuthToken();
            try {
                const res: { data: { data: News[] } } = await adminFetch.get('/post/get');
                setNews(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        getNews().catch(e => console.error(e));
    }, []);

    return { news };
}

export { useGetNewsHook };
