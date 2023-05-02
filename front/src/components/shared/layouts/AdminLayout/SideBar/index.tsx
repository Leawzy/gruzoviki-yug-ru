import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import Link from 'next/link';
import React from 'react';

import cn from './style.module.scss';

export default function SideBar() {
    return (
        <div className={cn.sidebar}>
            <div className={cn.top}>
                <Link href="/">
                    <span className={cn.logo}>ГРУЗОВИКИ-ЮГ</span>
                </Link>
            </div>
            <hr />
            <div className={cn.center}>
                <ul>
                    <p className={cn.title}>Главная</p>
                    <li>
                        <DashboardIcon className={cn.icon} />
                        <span>Панель Управления</span>
                    </li>
                    <p className={cn.title}>Управления</p>
                    <Link href="/admin/users/userAdd">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Добавить пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/users/userChange">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Отредактровать пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/brand/brandAdd">
                        <li>
                            <StoreIcon className={cn.icon} />
                            <span>Добавить бренд</span>
                        </li>
                    </Link>
                    <Link href="/">
                        <li>
                            <StoreIcon className={cn.icon} />
                            <span>Изменить бренд</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Остальное</p>
                    <li>
                        <ExitToAppIcon className={cn.icon} />
                        <span>Выход</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
