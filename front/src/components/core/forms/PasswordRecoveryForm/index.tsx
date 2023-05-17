import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { apiFetch } from '../../../../axios/global';
import cn from '../style.module.scss';

type Inputs = {
    email: string;
    password: string;
};

interface ResponseData {
    token: string;
}

export default function PasswordRecoveryForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res: { status: number; data: ResponseData } = await apiFetch('api/forgot', {
            method: 'post',
            data: {
                email: data.email,
            },
        });
        if (res.status === 200) {
            await router.push('/authorization');
        }
    };

    return (
        <div className={cn.AuthForm}>
            <form className={cn.Form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Восстановление пароля</h1>
                <label className={cn.FormLabel}>
                    E-mail
                    <input
                        className={errors.email ? `${cn.errorInput}` : ''}
                        type="email"
                        placeholder="Введите свой e-mail"
                        {...register('email', { required: true })}
                    />
                    {errors.email && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
                    )}
                </label>
                {errors.email || errors.password ? (
                    <div className={cn.FormBtn}>
                        <input disabled type="submit" value="Восстановить пароль" />
                    </div>
                ) : (
                    <div className={cn.FormBtn}>
                        <input type="submit" value="Восстановить пароль" />
                    </div>
                )}
                <p>
                    Вспомнили пароль всё же? - <Link href="/authorization">Авторизоваться</Link>
                </p>
            </form>
        </div>
    );
}
