import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { OrderTypeIF } from '../../types/OrderType';

function useGetOrderHook() {
    const [order, setOrder] = useState<OrderTypeIF[]>([]);
    useEffect(() => {
        const getOrders = async () => {
            setAuthToken();
            try {
                const res: { data: { data: OrderTypeIF[] } } = await adminFetch.get('/order/get');
                setOrder(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        getOrders().catch(e => console.error(e));
    }, []);

    return { order };
}

export { useGetOrderHook };
