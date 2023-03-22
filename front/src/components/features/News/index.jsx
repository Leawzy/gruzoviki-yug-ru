import React from 'react';
import newsTest from "../../../assets/image/news/remgruzo-01.jpg";

function News() {
    return (
        <section className='news'>
            <div className="news__wrapper">
                <h3>Новости</h3>
            </div>
            <div className="news__item-list">
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
                <div className="news__item">
                    <a href="#" className='news__link'>
                        <img className="news__link-img" src={newsTest} alt="News Pic"/>
                        <div className="news__link-bg">
                            <span className="news__title">Title</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default News;