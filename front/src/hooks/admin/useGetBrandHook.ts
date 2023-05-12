import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../axios/global';
import { AdminTypeBrand } from '../../types/AdminType';

function useGetBrandHook() {
    const [brand, setBrand] = useState<AdminTypeBrand[]>([]);
    useEffect(() => {
        const getAdminUsers = async () => {
            setAuthToken();
            try {
                const res = await adminFetch.get<{ data: AdminTypeBrand[] }>('/brand/get');
                setBrand(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAdminUsers().catch(e => console.error(e));
    }, []);

    return { brand };
}

export { useGetBrandHook };
