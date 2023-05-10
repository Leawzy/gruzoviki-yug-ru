import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect, useState } from 'react';
import { RotateLoader } from 'react-spinners';

import { apiFetch } from '../../axios/global';
import { News } from '../../types/NewsType';

const override: CSSProperties = {
    margin: '22% 48%',
};

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
    }, [newsId]);

    if (!news)
        return (
            <RotateLoader cssOverride={override} color="#4c96e3" size={15} speedMultiplier={1} />
        );

    return <div>{news.title}</div>;
}

export default ProductPage;
