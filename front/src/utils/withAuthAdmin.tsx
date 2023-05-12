import { useRouter } from 'next/router';
import React from 'react';

import { useProfileData } from '../hooks/admin/useGetProfileHook';

type Props = Record<string, unknown>;

export function withAuthAdmin<P extends Props>(Component: React.ComponentType<P>): React.FC<P> {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();
        const { profile } = useProfileData();

        function checkAuthAdmin() {
            if (profile.role === 'user') {
                router.replace('/').catch(e => console.error(e));
            }
        }

        checkAuthAdmin();

        return <Component {...props} />;
    };
}
