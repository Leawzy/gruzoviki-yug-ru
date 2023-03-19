import React from 'react';
import Slider from "./components/Slider/index.jsx";
import NewCard from "./components/NewCards/index.jsx";
import BaseLayout from "../../shared/layouts/BaseLayout/index.jsx";
import aboutIMG from "../../../assets/image/about/AboutIMG.svg";

import './style.scss';

import newsTest from '../../../assets/image/news/remgruzo-01.jpg'

export default function HomePage() {
    return (
        <BaseLayout>
            <Slider/>
            <NewCard/>
            <section className='aboutsection__page'>
                <div className='aboutsection__wrapper'>
                    <div className='aboutsection__img-block'>
                        <img src={aboutIMG} alt="aboutIMG" className='aboutsection__img-item' height={466} width={551}/>
                    </div>
                    <div className='aboutsection__content-block'>
                        <h1> О комапнии</h1>
                        <p className='aboutsection__content-text'>Наша компания специализируется на ремонте грузовиков
                            европейского и американского типа в городе Ростове-на-Дону. Мы имеем многолетний опыт работы
                            с различными марками грузовиков, включая Volvo, MAN, Scania, Freightliner, Mack и другие.
                        </p>
                        <p className='aboutsection__content-text'>
                            Наша команда высококвалифицированных механиков и техников имеет широкий спектр знаний и
                            навыков, необходимых для проведения любых ремонтных работ на грузовиках. Мы используем
                            только качественные запчасти и оборудование, чтобы гарантировать, что ваш грузовик будет
                            отремонтирован в соответствии с высокими стандартами качества.
                        </p>
                        <a href={'#'} className='aboutsection__btn'>Подробнее</a>
                    </div>
                </div>
            </section>
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
        </BaseLayout>
    );
}
