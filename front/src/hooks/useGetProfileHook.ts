import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useEffect, useState } from 'react';

import { apiFetch, setAuthToken } from '../axios/global';
import { ProfileType } from '../types/ProfileType';

function useProfileData() {
    const router = useRouter();
    // @ts-ignore
    const [profile, setProfile] = useState<ProfileType>([]);
    useEffect(() => {
        const getProfile = async () => {
            setAuthToken();
            try {
                const res: { data: ProfileType[] } = await apiFetch.get('api/profile');
                // @ts-ignore
                setProfile(res.data);
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.response?.status === 401) {
                    await router.push('/');
                    destroyCookie(null, 'token');
                }
            }
        };
        getProfile().catch(e => console.error(e));
    }, []);

    return { profile };
}

export { useProfileData };
