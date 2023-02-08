import React from 'react';
import Slider from "./components/Slider/index.jsx";
import NewCard from "./components/NewCards/index.jsx";
import BaseLayout from "../../shared/layouts/BaseLayout/index.jsx";
import aboutIMG from "../../../assets/image/about/AboutIMG.svg";

import './style.scss';

export default function HomePage() {
    return (
        <BaseLayout>
            <Slider />
            <NewCard />
            <section className='aboutsection__page'>
                <div className='aboutsection__wrapper'>
                    <div className='aboutsection__img-block'>
                        <img src={aboutIMG} alt="aboutIMG" className='aboutsection__img-item' height={426} width={551}/>
                    </div>
                    <div className='aboutsection__content-block'>
                        <h1> О комапнии</h1>
                        <p className='aboutsection__content-text'>На протяжении 6 лет компания «Автомастер» занимается поставками автозапчастей ГАЗ, УАЗ, ПАЗ, ВАЗ, Камаз.
                            Мы специализируемся на продвижение своего бренда ТМ PRAVT – сертифицированная торговая марка российской компании.
                            Наша география расширяется по всей России и ближнему зарубежью, мы стали узнаваемые.
                        </p>
                        <p className='aboutsection__content-text'>На сегодняшний день ассортимент нашей продукции более 600 позиций.
                            С каждым годом прогресс увеличения ассортимента
                            составляет не менее чем на 35%.
                            Производственные мощности, партнеры компании расположены на территории КНР.
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
                            <img src="" alt=""/>
                            <span>Title</span>
                        </a>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
