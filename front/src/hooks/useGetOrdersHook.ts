import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../axios/global';
import { OrderTypeIF } from '../types/OrderType';

function useGetOrdersHook() {
    const [orderList, setOrderList] = useState<OrderTypeIF[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchOrdersList() {
        setAuthToken();
        try {
            const res: { data: { data: OrderTypeIF[] } } = await apiFetch('/orders', {
                method: 'get',
            });
            setOrderList(res.data.data);
            setLoading(true);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrdersList().catch(e => console.error(e));
    }, []);

    return { orderList, loading };
}

export { useGetOrdersHook };
