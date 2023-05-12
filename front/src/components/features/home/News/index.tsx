import Link from 'next/link';
import React from 'react';

import { useNewsList } from '../../../../hooks/useNewsHook';
import SkeletonCard from '../PopularCards/SkeletonContainer';
import cn from './style.module.scss';

export default function News() {
    const { newsList, loading } = useNewsList();
    const maxItems = 6;

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
                    const formattedDate = new Date(item.createdAt).toLocaleString('ru-RU', {
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
                                    <span className={cn.newsDesc}>{item.shortDesc}</span>
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
