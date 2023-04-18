import Image from 'next/image';
import React, { useState } from 'react';

import cn from './style.module.scss';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className={cn.headerCenter}>
            <div className={cn.container}>
                <div className={cn.headerCenterWrapper}>
                    <div className={cn.headerLogo}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                        <a className={cn.headerLogoImg} />
                    </div>
                    <div className={cn.header__centerNav}>
                        <ul className={cn.headerCenterNavMenu}>
                            <li className={cn.headerCenterNavMenuItem}>
                                <a className={cn.headerCenterNavLink}>Детали</a>
                            </li>
                            <li className={cn.headerCenterNavMenuItem}>
                                <a className={cn.headerCenterNavLink}>Акссесуары</a>
                            </li>
                            <li className={cn.headerCenterNavMenuItem}>
                                <a className={cn.headerCenterNavLink}>Инстурменты</a>
                            </li>
                        </ul>
                    </div>
                    <form className={cn.headerSearch}>
                        <input
                            className={cn.headerSearchInput}
                            type="text"
                            placeholder="Что будем искать?"
                        />
                        <button type="submit" className={cn.headerSearchSubmit} />
                    </form>
                    <div className={cn.headerContact}>
                        <div className={cn.headerContactPhone}>
                            <a href="tel:89897774245">+8 989 777 42 45</a>
                            <a className={cn.headerContactTimetable}>
                                8:00 до 19:00 СБ и ВСК выходной
                            </a>
                        </div>
                    </div>
                    <div className={cn.headerLinks}>
                        <div className={`${cn.headerLinkItem} ${cn.dropmenu}`}>
                            <Image
                                src="images/icons/account.svg"
                                className={cn.headerLinkItemIcon}
                                width={34}
                                loading="lazy"
                                height={34}
                                alt="account"
                            />
                            <div className={cn.dropmenuContent}>
                                {isLoggedIn ? (
                                    <div className={cn.dropmenuContentText}>
                                        <a>Профиль</a>
                                        <button type="submit" className={cn.LogOut}>
                                            Выход
                                        </button>
                                    </div>
                                ) : (
                                    <div className={cn.dropmenuContentText}>
                                        <a>Авторизация</a>
                                        <a>Регистрация</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <a className={cn.headerLinkItem}>
                            <Image
                                src="images/icons/favorite.svg"
                                className={cn.headerLinkItemIcon}
                                loading="lazy"
                                width={34}
                                height={34}
                                alt="favorite"
                            />
                        </a>
                        <a className={cn.headerLinkItem}>
                            <Image
                                src="images/icons/basket.svg"
                                className={cn.headerLinkItemIcon}
                                loading="lazy"
                                width={34}
                                height={34}
                                alt="basket"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
