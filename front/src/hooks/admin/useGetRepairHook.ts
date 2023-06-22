import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { RepairTypeIF } from '../../types/RepairType';

function useGetRepairHook() {
    const [repairList, setRepairList] = useState<RepairTypeIF[]>([]);
    useEffect(() => {
        const getRepairs = async () => {
            setAuthToken();
            try {
                const res: { data: RepairTypeIF[] } = await adminFetch.get('/repair/get');
                setRepairList(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getRepairs().catch(e => console.error(e));
    }, []);

    return { repairList };
}

export { useGetRepairHook };
