import Link from 'next/link';
import React from 'react';

import { AdminTypeBrand, AdminTypeUser } from '../../../../../types/AdminType';
import { OrderTypeIF } from '../../../../../types/OrderType';
import { ProductIF } from '../../../../../types/ProductType';
import cn from './style.module.scss';

interface WidgetProps {
    id: number;
    title: string;
    link: string;
    type: string;
    users: AdminTypeUser[];
    brand: AdminTypeBrand[];
    products: ProductIF[];
    orderList: OrderTypeIF[];
}

interface WidgetData {
    id: number;
    title: string;
    amount: string;
    textLink: string;
    link: string;
}

export default function Widget({
    id,
    type,
    users,
    brand,
    products,
    orderList,
    title,
    link,
}: WidgetProps) {
    let data: WidgetData;
    const totalUser = String(users.length);
    const totalProducts = String(products.length);
    const totalBrands = String(brand.length);
    const totalOrders = String(orderList.length);

    switch (type) {
        case 'user':
            data = {
                id,
                title,
                amount: String(totalUser),
                textLink: 'Просмотреть всех пользователей',
                link,
            };
            break;
        case 'order':
            data = {
                id,
                title,
                amount: String(totalOrders),
                textLink: 'Просмотреть все заказы',
                link,
            };
            break;
        case 'brands':
            data = {
                id,
                title,
                amount: String(totalBrands),
                textLink: 'Просмотреть все бренды',
                link,
            };
            break;
        case 'category':
            data = {
                id,
                title,
                amount: String(totalBrands),
                textLink: 'Просмотреть все бренды',
                link,
            };
            break;
        case 'products':
            data = {
                id,
                title,
                amount: String(totalProducts),
                textLink: 'Просмотреть все бренды',
                link,
            };
            break;
        default:
            data = {
                id,
                title: '',
                amount: String(1),
                textLink: '',
                link: '/controlpanel',
            };
            break;
    }

    return (
        <div className={cn.widget} id={String(id)}>
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
