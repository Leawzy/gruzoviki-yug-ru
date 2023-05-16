import { adminFetch, setAuthToken } from '../../../axios/global';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useSendChangeHook = async (url: string, data: {}, methodText: string) => {
    setAuthToken();
    try {
        const res: Response = await adminFetch(url, {
            method: methodText,
            data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        if (res.status === 200) {
            location.reload();
        }
    } catch (e) {
        console.error(e);
    }
};
