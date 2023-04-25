import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import account from '../../../../../../public/images/icons/account.svg';
import basket from '../../../../../../public/images/icons/basket.svg';
import favorite from '../../../../../../public/images/icons/favorite.svg';
import cn from './style.module.scss';

export default function Header() {
    const [login, setIsLogged] = useState(false);
    return (
        <div className={cn.headerCenter}>
            <div className={cn.container}>
                <div className={cn.headerCenterWrapper}>
                    <div className={cn.headerLogo}>
                        <Link href="/" className={cn.headerLogoImg} />
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
                                src={account as string}
                                className={cn.headerLinkItemIcon}
                                width={34}
                                loading="lazy"
                                height={34}
                                alt="account"
                            />
                            <div className={cn.dropmenuContent}>
                                {login ? (
                                    <div className={cn.dropmenuContentText}>
                                        <a>Профиль</a>
                                        <button type="submit" className={cn.LogOut}>
                                            Выход
                                        </button>
                                    </div>
                                ) : (
                                    <div className={cn.dropmenuContentText}>
                                        <Link href="/authorization">Авторизация</Link>
                                        <Link href="/registration">Регистрация</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <a className={cn.headerLinkItem}>
                            <Image
                                src={favorite as string}
                                className={cn.headerLinkItemIcon}
                                loading="lazy"
                                width={34}
                                height={34}
                                alt="favorite"
                            />
                        </a>
                        <Link href="/cart" className={cn.headerLinkItem}>
                            <Image
                                src={basket as string}
                                className={cn.headerLinkItemIcon}
                                loading="lazy"
                                width={34}
                                height={34}
                                alt="basket"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
