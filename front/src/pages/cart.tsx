import React, { useEffect, useState } from 'react';

import BaseLayout from '../components/shared/layouts/BaseLayout';
import { useCartStore } from '../mobx/CartStore/CartStoreContext';
import { CartItem } from '../types/CartType';

function Cart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const { getItemStore } = useCartStore();

    function getAll() {
        const itemTitles = getItemStore()?.map(e => e);
        setItems(itemTitles);
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <BaseLayout>
            <h1>Cart Page</h1>
            {items.map((e: CartItem) => (
                <div key={e.id}>
                    <ul>
                        <li>
                            {e.title}
                            {e.quantity}
                        </li>
                    </ul>
                </div>
            ))}
        </BaseLayout>
    );
}

export default Cart;
