import React from 'react';

import '../config.scss'

import aboutIMG from '../assets/image/about/AboutIMG.svg'
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import Slider from "../components/features/Slider/index.jsx";
import PopularCard from "../components/features/NewCards/index.jsx";
import News from "../components/features/News/index.jsx";

const images = [
    'http://5.167.50.180:8876/storage/slider/slide1.png',
    'http://5.167.50.180:8876/storage/slider/slide2.png',
];

function Home() {
    return (
        <BaseLayout>
            <Slider images={images} />
            <PopularCard />
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
            <News />
        </BaseLayout>
    )
}

export default Home;