import Link from 'next/link';
import React from 'react';

import { useRegisterHook } from '../../../../hooks/actions/useRegisterHook';
import cn from '../style.module.scss';

export default function RegistrationForm() {
    const { register, handleSubmit, errors } = useRegisterHook();

    return (
        <div className={cn.RegisterForm}>
            <form className={cn.Form} onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <label className={cn.FormLabel}>
                    Имя
                    <input
                        className={errors.firstName ? `${cn.errorInput}` : ''}
                        type="text"
                        placeholder="Введите своё имя"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
                    )}
                </label>
                <label className={cn.FormLabel}>
                    Фамилия
                    <input
                        className={errors.lastName ? `${cn.errorInput}` : ''}
                        type="text"
                        placeholder="Введите свою фамилию"
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
                    )}
                </label>
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
                <label className={cn.FormLabel}>
                    Повторите пароль
                    <input
                        className={errors.passwordConfirmation ? `${cn.errorInput}` : ''}
                        type="password"
                        placeholder="Повторите пароль"
                        {...register('passwordConfirmation', { required: true })}
                    />
                    {errors.passwordConfirmation && (
                        <span className={cn.FormLabelError}>Это поле должно быть заполненным</span>
                    )}
                </label>
                {errors.email ||
                errors.password ||
                errors.firstName ||
                errors.lastName ||
                errors.passwordConfirmation ? (
                    <div className={cn.FormBtn}>
                        <input disabled type="submit" value="Зарегистрироваться" />
                    </div>
                ) : (
                    <div className={cn.FormBtn}>
                        <input type="submit" value="Зарегистрироваться" />
                    </div>
                )}
                <p>
                    Есть уже аккаунт? - <Link href="/authorization">Авторизуйтесь</Link>
                </p>
                <div className={cn.acceptPrivacy}>
                    <p>
                        Регистрируясь, вы соглашаетесь с
                        <Link href="/privacy/tos"> Условиями предоставления услуг </Link> и
                        <Link href="/privacy/privacy"> Политикой конфиденциальности </Link>, а также
                        с<Link href="/privacy/privacy">Политикой использования файлов cookie.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
