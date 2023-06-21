import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { FeedBackIF } from '../../types/FeedBack';

function useGetFeedBackHook() {
    const [feedBack, setFeedBack] = useState<FeedBackIF[]>([]);
    useEffect(() => {
        const getFeedBack = async () => {
            setAuthToken();
            try {
                const res: { data: FeedBackIF[] } = await adminFetch.get('/feedback/get');
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
