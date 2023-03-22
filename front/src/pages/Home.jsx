import React from 'react';

import '../config.scss'

import aboutIMG from '../assets/image/about/AboutIMG.svg'
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import Slider from "../components/features/Slider/index.jsx";
import NewCard from "../components/features/NewCards/index.jsx";
import News from "../components/features/News/index.jsx";

const images = [
    'https://downloader.disk.yandex.ru/preview/e30e9c3dd6ed17d6f041d15fc751ccd4a511a4fa775cb1ea1c7b0477fd498716/641b7e85/Fj0na9qIyihGZDUqGBosEULjt0O4lu0Ae3cZx5U4SZrGWcYuSI0pgJJvaCT9I0mBAzSCJqgDkKhYtT2Vfpwdbw%3D%3D?uid=0&filename=%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%202.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048',
    'https://downloader.disk.yandex.ru/preview/0d12baf5cdab0e92a2f743599a603fbceddb7df64b30fe992a9a50c4793eb801/641b7e88/SNtRCDHGmxDg7qFbB7KjE0Ljt0O4lu0Ae3cZx5U4SZr7vo8VFUqmhyNn9WAXkGjSvUJAQg3UaG9G7fTIPKdhGA%3D%3D?uid=0&filename=%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%203.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048',
];

function Home() {
    return (
        <BaseLayout>
            <Slider images={images} />
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
            <News />
        </BaseLayout>
    )
}

export default Home;