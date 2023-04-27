import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { apiFetch } from '../../../../axios/global';
import cn from '../style.module.scss';

const daysLive = 30 * 24 * 60 * 60;

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export default function RegistrationForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        if (data.password === data.passwordConfirmation) {
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
                const { token } = res.data;
                setCookie(null, 'token', token, {
                    maxAge: daysLive,
                });
                await router.push('/');
            }
        }
    };

    return (
        <div className={cn.BackgroundForms}>
            <form className={cn.Form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Регистрация</h1>
                <label className={cn.FormLabel}>
                    Имя
                    <input
                        type="text"
                        placeholder="Введите своё имя"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
                <label className={cn.FormLabel}>
                    Фамилия
                    <input
                        type="text"
                        placeholder="Введите свою фамилию"
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
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
                <label className={cn.FormLabel}>
                    Повторите пароль
                    <input
                        type="password"
                        placeholder="Повторите пароль"
                        {...register('passwordConfirmation', { required: true })}
                    />
                    {errors.passwordConfirmation && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}
