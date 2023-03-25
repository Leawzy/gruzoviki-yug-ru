import React from 'react';

import './footer.scss'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__addr">
                <h1 className="footer__logo">Грузовики-Юг</h1>
                <address>
                    <a className={'map__address'} href={'https://yandex.ru/maps/?ll=39.855348%2C47.123700&mode=routes&rtext=~47.123747%2C39.855329&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D180686594518&z=17.1'}>Промышленная ул., 16, хутор Маяковского</a>
                </address>
                <div className={'footer__phones'}>
                    <a href="">7 989 633 84 44</a>
                    <a href="">7 989 633 84 44</a>
                </div>
            </div>

            <ul className="footer__nav">
                <li className="nav__item">
                    <h2 className="nav__title">Покупка</h2>
                    <ul className="nav__ul">
                        <li>
                            <a href="#">Как заказать?</a>
                        </li>
                        <li>
                            <a href="#">Гарантии на товар</a>
                        </li>
                        <li>
                            <a href="#">Возрат товара</a>
                        </li>
                        <li>
                            <a href="#">Оплата</a>
                        </li>
                    </ul>
                </li>
                <li className="nav__item">
                    <h2 className="nav__title">Навигация</h2>
                    <ul className="nav__ul">
                        <li>
                            <a href="#">Доставка</a>
                        </li>
                        <li>
                            <a href="#">Блог</a>
                        </li>
                        <li>
                            <a href="#">Контакты</a>
                        </li>
                        <li>
                            <a href="#">Обратная связь</a>
                        </li>
                    </ul>
                </li>
                <li className="nav__item">
                    <h2 className="nav__title">Остальное</h2>

                    <ul className="nav__ul">
                        <li>
                            <a href="#">Политика кондифициальности</a>
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
            <div className="legal">
                <p>&copy; 2023 Грузовики-Юг. Все права защещены.</p>
            </div>
        </footer>
    );
}

export default Footer;