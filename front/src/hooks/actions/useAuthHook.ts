import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiFetch, dayOfLiveToken } from '../../axios/global';

type Inputs = {
    email: string;
    password: string;
};

interface ResponseData {
    token: string;
    message: string;
}

const useAuthHook = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        try {
            const res: { status: number; data: ResponseData } = await apiFetch('api/login', {
                method: 'post',
                data: {
                    email: data.email,
                    password: data.password,
                },
            });
            if (res.status === 200) {
                const { token } = res.data;
                setCookie(null, 'token', token, {
                    maxAge: dayOfLiveToken(),
                });
                await router.push('/');
            }
        } catch (e) {
            const errorMessage: string =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.response?.data?.error as string) || 'Произошла ошибка при регистрации';
            toast.error(errorMessage);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
    };
};

export { useAuthHook };
