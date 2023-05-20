import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiFetch } from '../../axios/global';

type Inputs = {
    email: string;
    password: string;
};

interface ResponseData {
    token: string;
    message: string;
    errorMessage: string;
}

const usePasswordRecoveryHook = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            const res: { status: number; data: ResponseData } = await apiFetch('api/forgot', {
                method: 'post',
                data: {
                    email: data.email,
                },
            });
            if (res.status === 200) {
                await router.push('/authorization');
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

export { usePasswordRecoveryHook };
