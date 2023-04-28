import { destroyCookie } from 'nookies';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { apiFetch, setAuthToken } from '../../../../axios/global';
import { ProfileType } from '../../../../types/ProfileType';
import ProfileForm from '../../../core/forms/ProfileForm';
import cn from './style.module.scss';

interface ProfileLayoutProps {
    profileData: ProfileType;
}

export default function ProfileLayout({ profileData }: ProfileLayoutProps) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'oldPassword':
                setOldPassword(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setAuthToken();
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Пароли не совпадают', {
                position: 'bottom-right',
                autoClose: 3400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        try {
            const res = await apiFetch('/change', {
                method: 'post',
                headers: {},
            });
            if (res.status === 200) {
                destroyCookie(null, 'token');
            } else {
                toast.error('Ошибка при смене пароля', {
                    position: 'bottom-right',
                    autoClose: 3400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={cn.profileContainer}>
            <ToastContainer />
            <div className={`${cn.profileBlock} ${cn.blockFirst}`}>
                <p className={cn.profileTitle}>ФИО</p>
                <p className={cn.profileData}>
                    {!profileData.firstName
                        ? 'Поле не заполнено'
                        : `${profileData.firstName} ${profileData.lastName}`}
                </p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockSecond}`}>
                <p className={cn.profileTitle}>Адрес</p>
                <p className={cn.profileData}>Поле не заполнено</p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockThird}`}>
                <p className={cn.profileTitle}>Email</p>
                <p className={cn.profileData}>
                    {!profileData.email ? 'Поле не заполнено' : `${profileData.email}`}
                </p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockFourth}`}>
                <p className={cn.profileTitle}>Телефон</p>
                <p className={cn.profileData}>
                    {!profileData.phone ? 'Поле не заполнено' : `${profileData.phone}`}
                </p>
            </div>
            <div className={` ${cn.profileBlock} ${cn.blockFiftieth}`}>
                <ProfileForm
                    submitHandler={submitHandler}
                    changeHandler={changeHandler}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    oldPassword={oldPassword}
                />
            </div>
        </div>
    );
}
