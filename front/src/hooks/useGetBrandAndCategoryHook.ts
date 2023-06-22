import { useEffect, useState } from 'react';

import { apiFetch } from '../axios/global';
import { SpecialTypeIF } from '../types/SpecialType';

function useGetBrandAndCategoryHook() {
    const [brand, setBrand] = useState<SpecialTypeIF[]>([]);
    const [category, setCategory] = useState<SpecialTypeIF[]>([]);

    async function fetchSpecial() {
        try {
            const res: { data: { brand: SpecialTypeIF[]; category: SpecialTypeIF[] } } =
                await apiFetch('/api/special', {
                    method: 'get',
                });
            setBrand(res.data.brand);
            setCategory(res.data.category);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSpecial().catch(e => console.error(e));
    }, []);

    return { brand, category };
}

export { useGetBrandAndCategoryHook };
