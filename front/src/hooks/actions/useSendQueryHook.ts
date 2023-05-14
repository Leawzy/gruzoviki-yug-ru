import { useRouter } from 'next/router';

import { apiFetch } from '../../axios/global';

export function useSendQuery() {
    const router = useRouter();

    async function sendQuery(query: string) {
        try {
            const res = await apiFetch(`api/product/search?q=${query}`, { method: 'get' });
            if (res.status === 200) {
                await router.push('/catalog');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return { sendQuery };
}
