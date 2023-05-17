import React from 'react';

import { OrderTypeIF } from '../../../../types/OrderType';
import cn from './style.module.scss';

export default function ProfileOrders({ orders }: { orders: OrderTypeIF[] }) {
    return (
        <>
            {orders?.map((order: OrderTypeIF) => (
                <article key={order.id} className={cn.orderCard}>
                    <div className={cn.orderCardTop}>
                        <div className={cn.orderCardTopInfo}>
                            <p>
                                Статус заказа от{' '}
                                {order.date === null ? 'Дата не указана' : order.date}
                            </p>
                            <p>№{order.id}</p>
                        </div>
                        <p>{order.total} руб.</p>
                    </div>
                    <div className={cn.orderCardBottom}>
                        <div>
                            <div
                                className={`${cn.orderCardStatus} ${
                                    order.status === 'В обработке'
                                        ? `${cn.orderCardStatusWorking}`
                                        : ''
                                }`}
                            >
                                <p>{order.status}</p>
                            </div>
                            <p className={cn.orderCardDelivery}>{order.delivery}</p>
                            <div>
                                <ul className={cn.orderCardList}>
                                    <li className={cn.orderCardBottomInfo}>
                                        Доставка:{' '}
                                        {order.date === null ? 'Дата не указана' : order.date}
                                    </li>
                                    <li className={cn.orderCardBottomInfo}>
                                        Тип оплаты: {order.paymentMethod}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    <li>Название товара</li>
                                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
                                    {order.products.map((item: OrderTypeIF) => (
                                        <li key={item.id}>{item.title}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
}
