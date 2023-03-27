import React from 'react';
import {Link} from "react-router-dom";
import {useNewsList} from "../../../hooks/useFetchHook.js";
import Skeleton from "../NewCards/SkeletonCards/skeleton.jsx";

function News() {
    const {isLoading, error, data} = useNewsList();
    const maxItems = 6;

    if (isLoading) {
        return <Skeleton/>;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }


    return (
        <section className='news'>
            <div className="news__wrapper">
                <h3>Новости</h3>
            </div>
            <div className="news__item-list">
                {
                    data.slice(0, maxItems).map((item, index) => {
                        const formattedDate = new Date(item.created_at).toLocaleString('ru-RU', {
                            dateStyle: 'full',
                        });
                        return (
                            <div className="news__item news__card" key={index}>
                                <Link to={`/news/${item.id}`} className='news__link'>
                                    <img className="news__link-img" src={item.img} alt="News Pic"/>
                                    <div className="news__link-bg">
                                        <span className="news__title">{item.title}</span>
                                        <span className="news__desc">{item.short_desc}</span>
                                        <span className="news__time">{formattedDate}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default News;