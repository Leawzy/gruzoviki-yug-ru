import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React from 'react';

import {
    AddPhotoAlternateIcon,
    AddShoppingCartIcon,
    CategoryIcon,
    DashboardIcon,
    ExitToAppIcon,
    Inventory2Icon,
    NewspaperIcon,
    PersonOutlineIcon,
    RepeatOneIcon,
} from '../../../../../utils/getIcons';
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
                    <Link href="/admin/dashboard">
                        <li>
                            <DashboardIcon className={cn.icon} />
                            <span>Панель Управления</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Добавление</p>
                    <Link href="/admin/users/useradd">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Добавить пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/brand/brandadd">
                        <li>
                            <Inventory2Icon className={cn.icon} />
                            <span>Добавить бренд</span>
                        </li>
                    </Link>
                    <Link href="/admin/category/categoryadd">
                        <li>
                            <CategoryIcon className={cn.icon} />
                            <span>Добавить категорию</span>
                        </li>
                    </Link>
                    <Link href="/admin/slider/slideradd">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Добавить слайдер</span>
                        </li>
                    </Link>
                    <Link href="/admin/products/productadd">
                        <li>
                            <AddShoppingCartIcon className={cn.icon} />
                            <span>Добавить продукт</span>
                        </li>
                    </Link>
                    <Link href="/admin/news/newsadd">
                        <li>
                            <NewspaperIcon className={cn.icon} />
                            <span>Добавить новости</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Редактировать</p>
                    <Link href="/admin/users/userchange">
                        <li>
                            <PersonOutlineIcon className={cn.icon} />
                            <span>Отредактировать пользователя</span>
                        </li>
                    </Link>
                    <Link href="/admin/brand/brandchange">
                        <li>
                            <Inventory2Icon className={cn.icon} />
                            <span>Отредактировать бренд</span>
                        </li>
                    </Link>
                    <Link href="/admin/category/categorychange">
                        <li>
                            <CategoryIcon className={cn.icon} />
                            <span>Отредактировать категорию</span>
                        </li>
                    </Link>
                    <Link href="/admin/slider/sliderchange">
                        <li>
                            <AddPhotoAlternateIcon className={cn.icon} />
                            <span>Отредактировать слайдер</span>
                        </li>
                    </Link>
                    <Link href="/admin/products/productchange">
                        <li>
                            <AddShoppingCartIcon className={cn.icon} />
                            <span>Отредактировать продукты</span>
                        </li>
                    </Link>
                    <Link href="/admin/news/newschange">
                        <li>
                            <NewspaperIcon className={cn.icon} />
                            <span>Отредактировать новости</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Остальное</p>
                    <Link href="/admin/orders/orderschange">
                        <li>
                            <NewspaperIcon className={cn.icon} />
                            <span>Просмотреть заказы</span>
                        </li>
                    </Link>
                    <Link href="/admin/repair/repairchange">
                        <li>
                            <NewspaperIcon className={cn.icon} />
                            <span>Просмотреть записи на ремонт</span>
                        </li>
                    </Link>
                    <Link href="/admin/feedback/feedbackchange">
                        <li>
                            <NewspaperIcon className={cn.icon} />
                            <span>Просмотреть обратную связь</span>
                        </li>
                    </Link>
                    <p className={cn.title}>Инструменты</p>
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
