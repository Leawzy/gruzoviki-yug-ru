import Link from 'next/link';
import React from 'react';

import { useNewsList } from '../../../../hooks/useNewsHook';
import SkeletonCard from '../PopularCards/SkeletonCard';
import cn from './style.module.scss';

export default function News() {
    const { newsList, loading } = useNewsList();
    const maxItems = 6;

    if (!loading) {
        return <SkeletonCard />;
    }

    return (
        <section className={cn.news}>
            <div className={cn.newsWrapper}>
                <h3>Новости</h3>
            </div>
            <div className={cn.newsItemList}>
                {newsList.slice(0, maxItems).map((item, index) => {
                    const formattedDate = new Date(item.created_at).toLocaleString('ru-RU', {
                        dateStyle: 'full',
                    });
                    return (
                        <div className={`${cn.newsItem} ${cn.newsCard}`} key={index}>
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
