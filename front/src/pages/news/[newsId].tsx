import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { News } from '../../types/NewsType';

function ProductPage() {
    const router = useRouter();
    // @ts-ignore
    const [news, setNews] = useState<News>({});
    const { newsId } = router.query;

    useEffect(() => {
        async function getProductIdItem() {
            try {
                const res: { data: { data: News } } = await apiFetch(
                    `/api/post/card/${Number(newsId)}`
                );
                setNews(res.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        getProductIdItem().catch(error => console.error(error));
    }, []);

    return <div>{news.title}</div>;
}

export default ProductPage;
