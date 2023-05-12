import { adminFetch, setAuthToken } from '../../../axios/global';

export const useSendChangeHook = async (url: string, data: any, methodText: string) => {
    setAuthToken();
    try {
        const res: Response = await adminFetch(url, {
            method: methodText,
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.status === 200) {
            location.reload();
        }
    } catch (e) {
        console.error(e);
    }
};
