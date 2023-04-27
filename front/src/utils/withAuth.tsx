import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { isAuthenticated } from './checkAuth';

type Props = Record<string, unknown>;

export function withAuth<P extends Props>(Component: React.ComponentType<P>): React.FC<P> {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();

        useEffect(() => {
            async function checkAuth() {
                if (!isAuthenticated()) {
                    try {
                        await router.replace('/');
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            checkAuth().catch(e => console.error(e));
        }, []);

        return <Component {...props} />;
    };
}
