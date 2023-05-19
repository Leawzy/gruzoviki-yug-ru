import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import Preloader from '../../components/core/loaders/Preloader';
import BaseLayout from '../../components/shared/layouts/BaseLayout';
import { News } from '../../types/NewsType';
import cn from './style.module.scss';

function ProductPage() {
    const router = useRouter();
    // @ts-ignore
    const [news, setNews] = useState<News>({});
    const { newsSlug } = router.query;

    useEffect(() => {
        async function getNewsByIdItem() {
            try {
                const slugParts = (newsSlug as string)?.split('-');
                const newsId = slugParts?.[0];

                const res: { data: { data: News } } = await apiFetch(
                    `/api/post/card/${Number(newsId)}`
                );
                setNews(res.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        getNewsByIdItem().catch(error => console.error(error));
    }, [newsSlug]);

    if (!news) return <Preloader />;

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
