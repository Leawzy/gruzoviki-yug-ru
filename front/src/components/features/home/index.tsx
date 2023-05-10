import Image from 'next/image';
import React from 'react';

import { masterCard, storage, visa } from '../../../utils/images';
import News from './News';
import PopularCards from './PopularCards';
import Slider from './Slider';
import cn from './style.module.scss';

const images = [
    'http://api.ch32081.tw1.ru/storage/app/public/slider/slide1.png',
    'http://api.ch32081.tw1.ru/storage/app/public/slider/slide2.png',
];

function Home() {
    return (
        <>
            <Slider images={images} />
            <PopularCards />
            <section className={cn.aboutBlock}>
                <div className={cn.aboutBlockWrapper}>
                    <div className={cn.aboutBlockImage}>
                        <Image src={storage} width={662} height={464} alt="Storage Image" />
                    </div>
                    <div className={cn.aboutBlockContent}>
                        <h1>О компании</h1>
                        <p>
                            На протяжении 6 лет компания «Автомастер» занимается поставками
                            автозапчастей ГАЗ, УАЗ, ПАЗ, ВАЗ, Камаз. Мы специализируемся на
                            продвижение своего бренда ТМ PRAVT – сертифицированная торговая марка
                            российской компании. Наша география расширяется по всей России и
                            ближнему зарубежью, мы стали узнаваемые. На сегодняшний день ассортимент
                            нашей продукции более 600 позиций. С каждым годом прогресс увеличения
                            ассортимента составляет не менее чем на 35%. Производственные мощности,
                            партнеры компании расположены на территории КНР.
                        </p>
                    </div>
                </div>
            </section>
            <News />
            <section className={cn.aboutCardBlock}>
                <div className={cn.aboutCardWrapper}>
                    <div className={cn.aboutCardLight}>
                        <p>
                            Продукция бренда PRAVT известна в России за счет высокого качества и
                            своей надежности. Вся продукция компании PRAVT сертифицирована и
                            соответствует техническому регламенту.
                        </p>
                        <p>Таможенного союза: EAC №TC RU C-RU. OC13.B.02827 и ГОСТ Р.</p>
                    </div>
                    <div className={cn.aboutCard}>
                        <p>Варианты оплаты:</p>
                        <ul>
                            <li>- Оплата наличными</li>
                            <li>- Для юридических лиц возможен безналичный расчет</li>
                            <li>- Для физических лиц возможен безналичный расчет</li>
                        </ul>
                        <p>Так же принимаем к оплате:</p>
                        <div className={cn.aboutCardImages}>
                            <Image src={masterCard} alt="Pay method" />
                            <Image src={visa} alt="Pay method" />
                        </div>
                    </div>
                    <div className={cn.aboutCardLight}>
                        <p>
                            Продукция бренда PRAVT известна в России за счет высокого качества и
                            своей надежности. Вся продукция компании PRAVT сертифицирована и
                            соответствует техническому регламенту.
                        </p>
                        <p>Таможенного союза: EAC №TC RU C-RU. OC13.B.02827 и ГОСТ Р.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
