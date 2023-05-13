import Image from 'next/image';
import React from 'react';

import { calendar, call, invoices, mail } from '../../../utils/getImages';
import cn from './style.module.scss';

export default function Contact() {
    return (
        <section className={cn.contactPage}>
            <div className={cn.contactPageLists}>
                <h1>Контакты</h1>
                <ul className={cn.contactPageList}>
                    <div className={cn.contactPageListTop}>
                        <Image width={25} height={25} src={calendar} alt="Icon in Contact" />
                        <p>График работы отдела продаж</p>
                    </div>
                    <div className={cn.contactPageListContent}>
                        <li>9:00 - 22:00 (пн-пт)</li>
                        <li>Субботу - Воскресенье выходной</li>
                    </div>
                    <p>Оформление заказов через сайт круглосуточно</p>
                </ul>
                <ul className={cn.contactPageList}>
                    <div className={cn.contactPageListTop}>
                        <Image width={25} height={25} src={call} alt="Icon in Contact" />
                        <p>График работы отдела продаж</p>
                    </div>
                    <div className={cn.contactPageListContent}>
                        <li>7 000 000 00 00</li>
                        <li>7 000 000 00 00</li>
                        <li>7 000 000 00 00</li>
                    </div>
                </ul>
                <ul className={cn.contactPageList}>
                    <div className={cn.contactPageListTop}>
                        <Image width={25} height={25} src={mail} alt="Icon in Contact" />
                        <p>График работы отдела продаж</p>
                    </div>
                    <div className={cn.contactPageListContent}>
                        <li>info@elecity.ru</li>
                    </div>
                </ul>
                <ul className={cn.contactPageList}>
                    <div className={cn.contactPageListTop}>
                        <Image width={25} height={25} src={invoices} alt="Icon in Contact" />
                        <p>График работы отдела продаж</p>
                    </div>
                    <div className={cn.contactPageListContent}>
                        <li>
                            Для покупки по безналичному расчету отправляйте запрос на bn@elecity.ru.
                        </li>
                    </div>
                </ul>
            </div>
            <div className={cn.contactPageCallBack}>
                <h2>Оставить обращение</h2>
                <form className={cn.contactPageForm}>
                    <div className={cn.contactPageFormTop}>
                        <label>
                            ФИО
                            <input type="text" required />
                        </label>
                        <label>
                            Телефон
                            <input type="text" required />
                        </label>
                        <label>
                            Почта
                            <input type="email" required />
                        </label>
                        <label>
                            Выберите отдел
                            <select>
                                <option value="1">1</option>
                                <option value="1">3</option>
                                <option value="1">2</option>
                                <option value="1">4</option>
                            </select>
                        </label>
                    </div>
                    <div className={cn.contactPageFormBottom}>
                        <textarea required />
                        <button>Отправить</button>
                    </div>
                </form>
            </div>
            <div className={cn.contactPageMap}>
                <iframe
                    title="myFrame"
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Aadf503c8d493db84b041a6d7eb227197f147588a3976d525bfd0865b492dab34&amp;source=constructor"
                    width="1280"
                    height="556"
                />
            </div>
        </section>
    );
}
