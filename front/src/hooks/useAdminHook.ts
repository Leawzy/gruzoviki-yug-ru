import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../axios/global';
import { AdminTypeBrand, AdminTypeUser } from '../types/AdminType';

function useAdminUserData() {
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

function useAdminBrandData() {
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

export { useAdminBrandData, useAdminUserData };
