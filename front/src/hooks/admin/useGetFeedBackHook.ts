import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { OrderChangeIF } from '../../types/OrderType';

function useGetFeedBackHook() {
    const [feedBack, setFeedBack] = useState<OrderChangeIF[]>([]);
    useEffect(() => {
        const getFeedBack = async () => {
            setAuthToken();
            try {
                const res: { data: OrderChangeIF[] } = await adminFetch.get('/feedback/get');
                setFeedBack(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getFeedBack().catch(e => console.error(e));
    }, []);

    return { feedBack };
}

export { useGetFeedBackHook };
