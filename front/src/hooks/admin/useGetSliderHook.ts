import { useEffect, useState } from 'react';

import { apiFetch } from '../../axios/global';
import { SliderTypeIF } from '../../types/SliderType';

function useGetSliderHook() {
    const [slider, setSlider] = useState<SliderTypeIF[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSliderImage() {
            try {
                const res: {
                    status: number;
                    data: { data: SliderTypeIF[] };
                } = await apiFetch('api/slider', {
                    method: 'get',
                });
                setSlider(res.data.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }

        fetchSliderImage().catch(e => console.error(e));
    }, []);

    return { slider, loading };
}

export { useGetSliderHook };
