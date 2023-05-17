import { adminFetch, setAuthToken } from '../../../axios/global';

export const useSendChangeHook = async (url: string, data: object, methodText: string) => {
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
