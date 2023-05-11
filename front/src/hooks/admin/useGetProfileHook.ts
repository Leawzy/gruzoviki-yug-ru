import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../../axios/global';
import { ProfileType } from '../../types/ProfileType';

function useProfileData() {
    // @ts-ignore
    const [profile, setProfile] = useState<ProfileType>([]);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: ProfileType } = await apiFetch.get('api/profile');
                setProfile(res.data);
            } catch {
                /* empty */
            }
        };
        getProfile().catch(e => console.error(e));
    }, []);

    return { profile };
}

export { useProfileData };
