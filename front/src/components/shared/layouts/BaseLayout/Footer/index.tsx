import Link from 'next/link';
import React from 'react';

import cn from './style.module.scss';

const linkYandexMap =
    'https://yandex.ru/maps/?ll=39.855348%2C47.123700&mode=routes&rtext=~47.123747%2C39.855329&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D180686594518&z=17.1';

export default function Footer() {
    return (
        <footer className={cn.footer}>
            <div className={cn.footerAddr}>
                <h1 className={cn.footerLogo}>Грузовики-Юг</h1>
                <address>
                    <a className={cn.mapAddress} href={linkYandexMap}>
                        Промышленная ул., 16, хутор Маяковского
                    </a>
                </address>
                <div className={cn.footerPhones}>
                    <a href="">7 989 633 84 44</a>
                    <a href="">7 989 633 84 44</a>
                </div>
            </div>
            <ul className={cn.footerNav}>
                <li className={cn.navItem}>
                    <h2 className={cn.navTitle}>Покупка</h2>
                    <ul className={cn.navUl}>
                        <li className={cn.navUlList}>
                            <a href="#">Как заказать?</a>
                        </li>
                        <li className={cn.navUlList}>
                            <a href="#">Гарантии на товар</a>
                        </li>
                        <li className={cn.navUlList}>
                            <a href="#">Возрат товара</a>
                        </li>
                        <li className={cn.navUlList}>
                            <a href="#">Оплата</a>
                        </li>
                    </ul>
                </li>
                <li className={cn.navItem}>
                    <h2 className={cn.navTitle}>Навигация</h2>
                    <ul className={cn.navUl}>
                        <li>
                            <a href="#">Доставка</a>
                        </li>
                        <li>
                            <a href="#">Блог</a>
                        </li>
                        <li>
                            <Link href="/contact">Контакты</Link>
                        </li>
                        <li>
                            <Link href="/contact">Обратная связь</Link>
                        </li>
                    </ul>
                </li>
                <li className={cn.navItem}>
                    <h2 className={cn.navTitle}>Остальное</h2>
                    <ul className={cn.navUl}>
                        <li>
                            <a>Политика кондифициальности</a>
                        </li>
                        <li>
                            <a href="#">Пользовательское соглашение</a>
                        </li>
                        <li>
                            <a href="#">Отзывы о нас</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className={cn.legal}>
                <p>&copy; 2023 Грузовики-Юг. Все права защещены.</p>
            </div>
        </footer>
    );
}
