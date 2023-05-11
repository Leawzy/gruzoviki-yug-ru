import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React from 'react';

import cn from './style.module.scss';

export default function SideBar() {
    const router = useRouter();

    async function logOut() {
        destroyCookie(null, 'token');
        await router.push('/');
    }

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
                    <Link href="/admin/admin">
                        <li>
                            <DashboardIcon className={cn.icon} />
                            <span>Панель Управления</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Добавление</p>
                    <Link href="/admin/users/userAdd">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Добавить пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/brand/brandAdd">
                        <li>
                            <Inventory2Icon className={cn.icon} />
                            <span>Добавить бренд</span>
                        </li>
                    </Link>
                    <Link href="/admin/category/categoryAdd">
                        <li>
                            <CategoryIcon className={cn.icon} />
                            <span>Добавить категорию</span>
                        </li>
                    </Link>
                    <Link href="/admin/slider/sliderAdd">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Добавить слайдер</span>
                        </li>
                    </Link>
                    <Link href="/admin/products/productAdd">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Добавить продукт</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Редактировать</p>
                    <Link href="/admin/users/userChange">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Отредактировать пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/brand/brandChange">
                        <li>
                            <Inventory2Icon className={cn.icon} />
                            <span>Отредактировать бренд</span>
                        </li>
                    </Link>
                    <Link href="/admin/category/categoryChange">
                        <li>
                            <CategoryIcon className={cn.icon} />
                            <span>Отредактировать категорию</span>
                        </li>
                    </Link>
                    <Link href="/admin/slider/sliderChange">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Отредактировать слайдер</span>
                        </li>
                    </Link>
                    <Link href="/admin/products/productChange">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Отредактировать продукты</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Остальное</p>
                    <Link href="/admin/convertor">
                        <li>
                            <RepeatOneIcon className={cn.icon} />
                            <span>Конвертер файлов</span>
                        </li>
                    </Link>
                    <li>
                        <ExitToAppIcon className={cn.icon} />
                        <button onClick={logOut}>Выход</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
