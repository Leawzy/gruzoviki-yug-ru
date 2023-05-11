import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../axios/global';
import { AdminTypeUser } from '../types/AdminType';

function useGetUserHook() {
    const [users, setUsers] = useState<AdminTypeUser[]>([]);

    useEffect(() => {
        const getAdminUsers = async () => {
            setAuthToken();
            try {
                const res = await adminFetch.get<{ data: AdminTypeUser[] }>('/user/get');
                setUsers(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAdminUsers().catch(e => console.error(e));
    }, []);

    return { users };
}

export { useGetUserHook };
