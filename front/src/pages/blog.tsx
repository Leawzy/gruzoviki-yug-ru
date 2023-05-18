import React, { useState } from 'react';

import NewsCard from '../components/core/card/NewsCard';
import Preloader from '../components/core/loaders/Preloader';
import BaseLayout from '../components/shared/layouts/BaseLayout';
import { useNewsList } from '../hooks/useGetNewsHook';

export default function BlogPage() {
    const [visibleNewsCount, setVisibleNewsCount] = useState(6);
    const itemsPerPage = 6;
    const { newsList, loading } = useNewsList();

    const handleLoadMore = () => {
        setVisibleNewsCount(prevCount => prevCount + itemsPerPage);
    };

    if (!loading) return <Preloader />;

    const visibleNews = newsList.slice(0, visibleNewsCount);

    return (
        <BaseLayout>
            <div className="news-grid">
                {visibleNews.map(news => (
                    <NewsCard
                        id={news.id}
                        createdAt={news.createdAt}
                        shortDesc={news.shortDesc}
                        key={news.id}
                        title={news.title}
                        img={news.img}
                    />
                ))}
            </div>
            <div className="load-more">
                {visibleNewsCount < newsList.length && (
                    <button className="load-more-button" onClick={handleLoadMore}>
                        Просмотреть еще
                    </button>
                )}
            </div>
        </BaseLayout>
    );
}
