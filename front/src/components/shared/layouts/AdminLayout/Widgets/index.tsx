import Link from 'next/link';
import React from 'react';

import { AdminTypeBrand, AdminTypeUser } from '../../../../../types/AdminType';
import cn from './style.module.scss';

interface WidgetProps {
    type: string;
    users: AdminTypeUser[];
    brand: AdminTypeBrand[];
}

interface WidgetData {
    title: string;
    amount: string;
    textLink: string;
    link: string;
}

export default function Widget({ type, users, brand }: WidgetProps) {
    let data: WidgetData;
    const totalUser = String(users.length);
    const totalBrands = String(brand.length);

    switch (type) {
        case 'user':
            data = {
                title: 'Пользователи',
                amount: String(totalUser),
                textLink: 'Просмотреть всех пользователей',
                link: '/admin/users/userChange',
            };
            break;
        case 'order':
            data = {
                title: 'Заказы',
                amount: String(0),
                textLink: 'Просмотреть все заказы',
                link: '/admin/orders',
            };
            break;
        case 'brands':
            data = {
                title: 'Бренды',
                amount: String(totalBrands),
                textLink: 'Просмотреть все бренды',
                link: '/admin/brand/brandChange',
            };
            break;
        case 'category':
            data = {
                title: 'Категорий',
                amount: String(totalBrands),
                textLink: 'Просмотреть все бренды',
                link: '/admin/brand/brandChange',
            };
            break;
        case 'products':
            data = {
                title: 'Продукты',
                amount: String(totalBrands),
                textLink: 'Просмотреть все бренды',
                link: '/admin/brand/brandChange',
            };
            break;
        default:
            data = {
                title: '',
                amount: String(1),
                textLink: '',
                link: '/controlpanel',
            };
            break;
    }

    return (
        <div className={cn.widget}>
            <div className={cn.left}>
                <span className={cn.title}>{data.title}</span>
                <span className={cn.counter}>{data.amount}</span>
                <Link href={data.link}>
                    <span className={cn.link}>{data.textLink}</span>
                </Link>
            </div>
        </div>
    );
}
