import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiFetch, dayOfLiveToken } from '../../axios/global';

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

interface LoginResponseData {
    token: string;
    message: string;
}

const useRegisterHook = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        if (data.password === data.passwordConfirmation) {
            try {
                const res = await apiFetch('api/register', {
                    method: 'post',
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        password_confirmation: data.passwordConfirmation,
                    },
                });
                if (res.status === 200) {
                    const { token } = res.data as LoginResponseData;
                    setCookie(null, 'token', token, {
                        maxAge: dayOfLiveToken(),
                    });
                    await router.push('/');
                }
            } catch (e) {
                const errorMessage: string =
                    (e.response?.data?.error as string) || 'Произошла ошибка при регистрации';
                toast.error(errorMessage);
            }
        }
    };
    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
    };
};

export { useRegisterHook };
