import Image from 'next/image';
import React from 'react';

import { useGetSliderHook } from '../../../hooks/admin/useGetSliderHook';
import { masterCard, storage, visa } from '../../../utils/getImages';
import News from './News';
import PopularCards from './PopularCards';
import Slider from './Slider';
import cn from './style.module.scss';

function Home() {
    const { slider, loading } = useGetSliderHook();

    return (
        <>
            {slider.length === 0 ? '' : <Slider images={slider} loading={loading} />}
            <PopularCards />
            <section className={cn.aboutBlock}>
                <div className={cn.aboutBlockWrapper}>
                    <div className={cn.aboutBlockImage}>
                        <Image src={storage} width={662} height={464} alt="Storage Image" />
                    </div>
                    <div className={cn.aboutBlockContent}>
                        <h1>О компании</h1>
                        <p>
                            На протяжении 6 лет компания "Грузовики-Юг" занимается ремонтом
                            европейских и американских грузовых автомобилей и прицепов в Ростовской
                            области. Мы специализируемся на обслуживании и ремонте таких марок, как
                            MAN, Volvo, DAF, Mercedes-Benz, Scania, Freightliner, и других известных
                            производителей. Наша компания широко известна и признана в регионе
                            благодаря высокому качеству предоставляемых услуг и профессионализму
                            нашей команды. Мы гордимся тем, что обладаем современным оборудованием и
                            техническими ресурсами, позволяющими проводить качественный ремонт и
                            обслуживание грузовых автомобилей и прицепов различных моделей и годов
                            выпуска. Наше местоположение в Ростовской области позволяет нам
                            эффективно обслуживать клиентов в этом регионе и близлежащих районах. Мы
                            предлагаем широкий спектр услуг, включая диагностику, ремонт двигателей,
                            ходовой части, электрических систем, а также сварочные работы и
                            покраску. Мы постоянно совершенствуем наши навыки и следим за последними
                            технологическими трендами в автомобильной индустрии, чтобы быть в курсе
                            всех новых разработок и инноваций. Наша команда опытных механиков и
                            специалистов всегда готова предложить высококачественное обслуживание и
                            быстрое решение любых проблем с грузовыми автомобилями и прицепами.
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
