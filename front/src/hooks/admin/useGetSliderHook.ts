import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../../axios/global';
import { SliderTypeIF } from '../../types/SliderType';

function useGetSliderHook() {
    const [slider, setSlider] = useState<SliderTypeIF[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchSliderImage() {
            setAuthToken();
            try {
                const res: {
                    status: number;
                    data: { data: SliderTypeIF[] };
                } = await apiFetch('api/slider', {
                    method: 'get',
                });
                setSlider(res.data.data);
                setLoading(true);
                if (res.status === 200) {
                    setLoading(true);
                } else {
                    setLoading(false);
                }
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
