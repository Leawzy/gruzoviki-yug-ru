import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../../axios/global';
import { ProfileType } from '../../types/ProfileType';

function useProfileData() {
    // @ts-ignore
    const [profile, setProfile] = useState<ProfileType>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: ProfileType } = await apiFetch.get('api/profile');
                setProfile(res.data);
                setLoading(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        getProfile().catch(e => console.error(e));
    }, []);

    return { profile, loading };
}

export { useProfileData };
