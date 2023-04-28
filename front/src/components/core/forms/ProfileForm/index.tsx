import React from 'react';

import cn from './style.module.scss';

interface ProfileFormProps {
    newPassword: string;
    oldPassword: string;
    confirmPassword: string;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileForm({
    submitHandler,
    oldPassword,
    newPassword,
    confirmPassword,
    changeHandler,
}: ProfileFormProps) {
    return (
        <form onSubmit={submitHandler} className={cn.profileForm}>
            <label className={cn.profileFormLabel}>
                Старый пароль
                <input
                    className={cn.profileFormInput}
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={changeHandler}
                />
            </label>
            <label className={cn.profileFormLabel}>
                Новый пароль
                <input
                    className={cn.profileFormInput}
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={changeHandler}
                />
            </label>
            <label className={cn.profileFormLabel}>
                Повторите пароль
                <input
                    className={cn.profileFormInput}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={changeHandler}
                />
            </label>
            <button className={cn.profileFormBtn} type="submit">
                Сменить пароль
            </button>
        </form>
    );
}

export default ProfileForm;
