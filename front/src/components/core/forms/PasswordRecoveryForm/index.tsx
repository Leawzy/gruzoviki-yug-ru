import Link from 'next/link';
import React from 'react';

import { usePasswordRecoveryHook } from '../../../../hooks/actions/usePasswordRecoveryHook';
import cn from '../style.module.scss';

export default function PasswordRecoveryForm() {
    const { register, handleSubmit, errors } = usePasswordRecoveryHook();

    return (
        <div className={cn.AuthForm}>
            <form className={cn.Form} onSubmit={handleSubmit}>
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
