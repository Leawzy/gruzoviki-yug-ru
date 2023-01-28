import React from 'react';

function headerBottom() {
    return (
        <div className='header__top'>
            <div className='container'>
                <div className="header__top-wrapper">
                    <div className='header__location'>
                        <a href="#" className='header__location-link'>Ростов-На-Дону</a>
                    </div>
                    <nav className='header__topNav'>
                        <ul className='header__topNav-menu'>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Отзывы</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>О нас</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Доставка</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Оплата</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Доп. Сервисы</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Гарантии</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Почему мы?</a>
                            </li>
                            <li className='header__topNav-item'>
                                <a href="" className='header__topNav-link'>Контакты</a>
                            </li>
                        </ul>
                    </nav>
                    <div className='header__user-profile'>
                        <a href={'#'} className='header__user-link'>Личный кабинет</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default headerBottom;