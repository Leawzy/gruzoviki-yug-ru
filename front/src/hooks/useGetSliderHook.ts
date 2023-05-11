import { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../axios/global';
import { SliderTypeIF } from '../types/SliderType';

function useGetSliderHook() {
    const [slider, setSlider] = useState<SliderTypeIF[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchSliderImage() {
            setAuthToken();
            try {
                const res: { data: { data: SliderTypeIF[] } } = await adminFetch('/slider/get', {
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
