import Image from 'next/image';
import Link from 'next/link';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import { useSendQuery } from '../../../../../hooks/actions/useSendQueryHook';
import { useProfileData } from '../../../../../hooks/admin/useGetProfileHook';
import { account, basket, favorite } from '../../../../../utils/getImages';
import cn from './style.module.scss';

export default function Header() {
    const [login, setIsLogged] = useState(false);
    const [query, setQuery] = useState('');
    const { profile } = useProfileData();
    const cookies = parseCookies();
    const { token } = cookies;

    useEffect(() => {
        if (token) {
            setIsLogged(true);
        }
    }, []);

    const logOut = () => {
        destroyCookie(null, 'token');
        location.reload();
    };

    const sendQuery = useSendQuery();

    const handleQuerySubmit = (e: React.FormEvent) => {
        // @ts-ignore
        sendQuery(query, e);
    };

    return (
        <>
            {profile.role === 'admin' ? (
                <div className={cn.headerCenterAdmin}>
                    <div>
                        <Link className={cn.headerCenterAdminLink} href="/admin/dashboard">
                            Панель управления
                        </Link>
                    </div>
                    <div className={cn.headerCenterAdminContent}>
                        <p>Добро пожаловать: {profile.firstName}</p>
                        <button onClick={logOut}>Выйти</button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className={cn.headerCenter}>
                <div className={cn.container}>
                    <div className={cn.headerCenterWrapper}>
                        <div className={cn.headerLogo}>
                            <Link href="/" className={cn.headerLogoImg} />
                        </div>
                        <div className={cn.header__centerNav}>
                            <ul className={cn.headerCenterNavMenu}>
                                <li className={cn.headerCenterNavMenuItem}>
                                    <Link href="/catalog" className={cn.headerCenterNavLink}>
                                        Каталог
                                    </Link>
                                </li>
                                <li className={cn.headerCenterNavMenuItem}>
                                    <Link href="/recordrepaier" className={cn.headerCenterNavLink}>
                                        Запись на ремонт
                                    </Link>
                                </li>
                                <li className={cn.headerCenterNavMenuItem}>
                                    <Link href="/blog" className={cn.headerCenterNavLink}>
                                        Новости
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <form className={cn.headerSearch} onSubmit={handleQuerySubmit}>
                            <input
                                className={cn.headerSearchInput}
                                type="text"
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Что будем искать?"
                            />
                            <button type="submit" className={cn.headerSearchSubmit} />
                        </form>
                        <div className={cn.headerContact}>
                            <div className={cn.headerContactPhone}>
                                <a href="tel:89897774245">+7 989 777 42 45</a>
                                <a className={cn.headerContactTimetable}>
                                    8:00 до 19:00 СБ и ВСК выходной
                                </a>
                            </div>
                        </div>
                        <div className={cn.headerLinks}>
                            <div className={`${cn.headerLinkItem} ${cn.dropmenu}`}>
                                <Image
                                    src={account}
                                    className={cn.headerLinkItemIcon}
                                    width={34}
                                    loading="lazy"
                                    height={34}
                                    alt="account"
                                />
                                <div className={cn.dropmenuContent}>
                                    {login ? (
                                        <div className={cn.dropmenuContentText}>
                                            {}
                                            <Link href="/profile">Профиль</Link>
                                            <button
                                                onClick={logOut}
                                                type="submit"
                                                className={cn.LogOut}
                                            >
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
                            <Link href="/favorite" className={cn.headerLinkItem}>
                                <Image
                                    src={favorite}
                                    className={cn.headerLinkItemIcon}
                                    loading="lazy"
                                    width={34}
                                    height={34}
                                    alt="favorite"
                                />
                            </Link>
                            <Link href="/cart" className={cn.headerLinkItem}>
                                <Image
                                    src={basket}
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
        </>
    );
}
