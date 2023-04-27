import Link from 'next/link';
import React, { useEffect } from 'react';

import { useNewsList } from '../../../../hooks/useNewsHook';
import SkeletonCard from '../PopularCards/SkeletonContainer';
import cn from './style.module.scss';

export default function News() {
    const { newsList, loading, fetchNewsList } = useNewsList();
    const maxItems = 6;

    useEffect(() => {
        fetchNewsList().catch(e => console.error(e));
    }, []);

    if (!loading) {
        newsList.map(item => (
            <div key={item.id}>
                <SkeletonCard />
            </div>
        ));
    }

    return (
        <section key="news-section" className={cn.news}>
            <div className={cn.newsWrapper}>
                <h3>Новости</h3>
            </div>
            <div key="news-item" className={cn.newsItemList}>
                {newsList.slice(0, maxItems).map(item => {
                    const formattedDate = new Date(item.created_at).toLocaleString('ru-RU', {
                        dateStyle: 'full',
                    });
                    return (
                        <div
                            className={`${cn.newsItem} ${cn.newsCard}`}
                            key={item.id}
                            id={String(item.id)}
                        >
                            <Link href={`/news/${item.id}`} className={cn.newsLink}>
                                <img className={cn.newsLinkImg} src={item.img} alt="News Pic" />
                                <div className={cn.newsLinkBg}>
                                    <span className={cn.newsTitle}>{item.title}</span>
                                    <span className={cn.newsDesc}>{item.short_desc}</span>
                                    <span className={cn.newsTime}>{formattedDate}</span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}