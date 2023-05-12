import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { apiFetch, setAuthToken } from '../../axios/global';

const useSendPasswordProfileHook = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const submitHandler = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (newPassword !== confirmPassword || newPassword === oldPassword) {
                toast.error('Пароли не совпадают', {
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
                try {
                    setAuthToken();
                    const res = await apiFetch('api/profile/change/password', {
                        method: 'patch',
                        data: {
                            oldPassword,
                            newPassword,
                        },
                    });
                    if (res.status === 200) {
                        destroyCookie(null, 'token');
                        await router.push('/authorization');
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
            }
        },
        [oldPassword, newPassword, confirmPassword]
    );

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        submitHandler,
    };
};

export { useSendPasswordProfileHook };
