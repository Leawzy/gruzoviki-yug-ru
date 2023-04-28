import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { apiFetch, dayOfLiveToken } from '../../../../axios/global';
import cn from '../style.module.scss';

type Inputs = {
    email: string;
    password: string;
};

interface ResponseData {
    token: string;
}

export default function AuthorizationForm() {
    const [agreement, setAgreement] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res: { status: number; data: ResponseData } = await apiFetch('api/login', {
            method: 'post',
            data: {
                email: data.email,
                password: data.password,
            },
        });
        if (res.status === 200) {
            const { token } = res.data;
            if (!agreement) {
                setCookie(null, 'token', token, {
                    maxAge: dayOfLiveToken(),
                });
            } else {
                setCookie(null, 'token', token, {
                    maxAge: 7 * 24 * 60 * 60,
                });
            }
            await router.push('/');
        }
    };

    function saveMe(e: React.ChangeEvent<HTMLInputElement>) {
        setAgreement(e.target.checked);
    }

    return (
        <div className={cn.AuthForm}>
            <form className={cn.Form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Авторизация</h1>
                <label className={cn.FormLabel}>
                    E-mail
                    <input
                        className={errors.email ? `${cn.errorInput}` : ''}
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
                        className={errors.password ? `${cn.errorInput}` : ''}
                        type="password"
                        placeholder="Введите пароль"
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненым</span>
                    )}
                </label>
                {errors.email || errors.password ? (
                    <div className={cn.FormBtn}>
                        <input disabled type="submit" value="Авторизироваться" />
                    </div>
                ) : (
                    <div className={cn.FormBtn}>
                        <input type="submit" value="Авторизироваться" />
                    </div>
                )}
                <div>
                    <p className="check__auth">
                        <input type="checkbox" onChange={saveMe} />
                        Запомнить меня
                    </p>
                </div>
            </form>
        </div>
    );
}
