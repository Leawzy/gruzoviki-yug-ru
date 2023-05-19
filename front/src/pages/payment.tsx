import Link from 'next/link';
import React from 'react';

export default function PaymentPage() {
    return (
        <section>
            <h1>Спасибо за заказ!</h1>
            <p>Все подробные данные об заказе будут у вас на почте.</p>
            <Link href="/">Вернуться назад</Link>
        </section>
    );
}
