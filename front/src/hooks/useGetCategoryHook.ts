import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../axios/global';
import { CategoryTypeIF } from '../types/CategoryType';

function useGetCategoryHook() {
    const [category, setCategory] = useState<CategoryTypeIF[]>([]);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: { data: CategoryTypeIF[] } } = await adminFetch.get(
                    '/category/get'
                );
                setCategory(res.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        getProfile().catch(e => console.error(e));
    }, []);

    return { category };
}

export { useGetCategoryHook };
