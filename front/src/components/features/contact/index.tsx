import Image from 'next/image';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../../axios/global';
import { useProfileData } from '../../../hooks/admin/useGetProfileHook';
import { calendar, call, invoices, mail } from '../../../utils/getImages';
import cn from './style.module.scss';

export default function Contact() {
    const { profile } = useProfileData();
    const cookies = parseCookies();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [questionCategory, setQuestionCategory] = useState('');
    const { token } = cookies;

    useEffect(() => {
        function isUserAuth() {
            if (token) {
                setFullName(`${profile.firstName} ${profile.lastName}`);
                setPhoneNumber(
                    `${
                        profile.phone === undefined
                            ? 'Номер не указан в профиле'
                            : `${profile.phone}`
                    }`
                );
                setEmail(profile.email);
            } else {
                setFullName('');
                setPhoneNumber('');
                setEmail('');
            }
        }

        isUserAuth();
    }, []);

    async function handlerSendFeedBack(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await apiFetch('api/feedback', {
                method: 'post',
                data: {
                    name: fullName,
                    email,
                    message,
                    phoneNumber,
                    questionCategory,
                },
            });
            if (res.status === 200) {
                setMessage('');
                setFullName('');
                setPhoneNumber('');
                setMessage('');
            }
        } catch (e) {
            console.error(e);
        }
    }

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
                            <input
                                type="text"
                                value={fullName}
                                onChange={event => setFullName(event.target.value)}
                                placeholder="Иванов Иван Иванович"
                                required
                            />
                        </label>
                        <label>
                            Телефон
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={event => setPhoneNumber(event.target.value)}
                                placeholder="7 000 000 00 00"
                                required
                            />
                        </label>
                        <label>
                            Почта
                            <input
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                placeholder="example@email.ru"
                                required
                            />
                        </label>
                        <label>
                            Категория вопроса
                            <select onChange={event => setQuestionCategory(event.target.value)}>
                                <option value="Гарантия">Гарантия</option>
                                <option value="Вопрос по сайту">Вопрос по сайту</option>
                                <option value="Вопрос по работе">Вопрос по работе</option>
                                <option value="Остальное">Остальное</option>
                            </select>
                        </label>
                    </div>
                    <div className={cn.contactPageFormBottom}>
                        <textarea
                            placeholder="Мой вопрос..."
                            required
                            onChange={event => setMessage(event.target.value)}
                        />
                        <button onClick={handlerSendFeedBack}>Отправить</button>
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
