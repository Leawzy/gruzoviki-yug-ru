import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';

import cn from './style.module.scss';

interface WidgetProps {
    type: string;
    users: {
        total: number;
    };
    brand: {
        total: number;
    };
}

interface WidgetData {
    title: string;
    amount: number;
    link: string;
}

export default function Widget({ type, users, brand }: WidgetProps) {
    let data: WidgetData;

    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'Пользователи',
                amount: users.total,
                link: 'See all users',
            };
            break;
        case 'order':
            data = {
                title: 'Заказы',
                amount: 0,
                link: 'View all orders',
            };
            break;
        case 'brands':
            data = {
                title: 'Бренды',
                amount: brand.total,
                link: 'View net earnings',
            };
            break;
        default:
            data = {
                title: '',
                amount: 1,
                link: '',
            };
            break;
    }

    return (
        <div className={cn.widget}>
            <div className={cn.left}>
                <span className={cn.title}>{data.title}</span>
                <span className={cn.counter}>{data.amount}</span>
                <span className={cn.link}>{data.link}</span>
            </div>
            <div className={cn.right}>
                <div className={`${cn.percentage} ${cn.positive}`}>
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div>
            </div>
        </div>
    );
}
