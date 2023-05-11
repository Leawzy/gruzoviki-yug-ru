import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { apiFetch, setAuthToken } from '../../axios/global';

const useSendProfileValuesHook = () => {
    const handlerFormSubmit = useCallback(
        async (
            firstName: string,
            address: string,
            email: string,
            phoneNumber: number,
            lastName: string
        ) => {
            try {
                setAuthToken();
                const res = await apiFetch('api/profile/change/info', {
                    method: 'post',
                    data: {
                        firstName,
                        address,
                        email,
                        lastName,
                        phoneNumber,
                    },
                });
                if (res.status === 200) {
                    toast.success('Вы успешно сменили данные', {
                        position: 'bottom-right',
                        autoClose: 3400,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    toast.error('Ошибка при смене пароля', {
                        position: 'bottom-right',
                        autoClose: 3400,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },
        []
    );

    return { handlerFormSubmit };
};

export { useSendProfileValuesHook };
