import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect, useState } from 'react';
import { RotateLoader } from 'react-spinners';

import { apiFetch } from '../../axios/global';
import BaseLayout from '../../components/shared/layouts/BaseLayout';
import { News } from '../../types/NewsType';
import cn from './style.module.scss';

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

    return (
        <BaseLayout>
            <div className={cn.container}>
                <h1 className={cn.title}>{news.title}</h1>
                <div className={cn.imageContainer}>
                    {news.img === null && undefined ? (
                        ''
                    ) : (
                        <Image src={news.img} alt={news.title} width={600} height={400} />
                    )}
                </div>
                <p className={cn.description}>{news.description}</p>
            </div>
        </BaseLayout>
    );
}

export default ProductPage;
