import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { apiFetch } from '../../../../axios/global';
import cn from '../style.module.scss';

const daysLive = 30 * 24 * 60 * 60;

type Inputs = {
    email: string;
    password: string;
};

export default function AuthorizationForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await apiFetch('api/login', {
            method: 'post',
            data: {
                email: data.email,
                password: data.password,
            },
        });
        if (res.status === 200) {
            const { token } = res.data;
            setCookie(null, 'token', token, {
                maxAge: daysLive,
            });
            await router.push('/');
        }
    };

    return (
        <div className={cn.BackgroundForms}>
            <form className={cn.Form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Авторизация</h1>
                <label className={cn.FormLabel}>
                    E-mail
                    <input
                        type="email"
                        placeholder="Введите свой e-mail"
                        {...register('email', { required: true })}
                    />
                    {errors.email && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
                <label className={cn.FormLabel}>
                    Пароль
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}
