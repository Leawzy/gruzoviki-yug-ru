import Link from 'next/link';
import React from 'react';

import { useAuthHook } from '../../../../hooks/actions/useAuthHook';
import cn from '../style.module.scss';

export default function AuthorizationForm() {
    const { register, handleSubmit, errors } = useAuthHook();

    return (
        <div className={cn.AuthForm}>
            <form className={cn.Form} onSubmit={handleSubmit}>
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
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
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
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
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
                <p>
                    Не помните свой пароль? -{' '}
                    <Link href="/passwordrecovery">Восстановите пароль</Link>
                </p>
                <p>
                    Нет аккаунта? - <Link href="/registration">Зарегистрируйтесь</Link>
                </p>
            </form>
        </div>
    );
}
