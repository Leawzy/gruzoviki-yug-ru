import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useSendPasswordProfileHook } from '../../../../hooks/actions/useSendPasswordProfileHook';
import { useSendProfileValuesHook } from '../../../../hooks/actions/useSendProfleValuesHook';
import { ProfileType } from '../../../../types/ProfileType';
import ChangePasswordForm from '../../../core/forms/ChangePasswordForm';
import cn from './style.module.scss';

interface ProfileLayoutProps {
    profileData: ProfileType;
    changeForm: boolean;
    setChangeForm: (e: boolean) => void;
}

export default function ProfileLayout({
    profileData,
    changeForm,
    setChangeForm,
}: ProfileLayoutProps) {
    const [firstName, setFirstName] = useState(profileData.firstName);
    const [lastName, setLastName] = useState(profileData.lastName);
    const [address, setAddress] = useState(profileData.address);
    const [email, setEmail] = useState(profileData.email);
    const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);
    const {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        submitHandler,
    } = useSendPasswordProfileHook();
    const { handlerFormSubmit } = useSendProfileValuesHook();

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

    const handlerSaveValue = () => {
        handlerFormSubmit(firstName, lastName, email, address, phoneNumber).catch(e =>
            console.error(e)
        );
        setChangeForm(false);
    };

    return (
        <div className={cn.profileContainer}>
            <ToastContainer />
            {changeForm ? (
                <>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockForm}`
                        } ${cn.blockFirst}`}
                    >
                        <label>Имя</label>
                        <input
                            type="text"
                            onChange={event => setFirstName(event.target.value)}
                            value={firstName}
                            placeholder={profileData.firstName}
                        />
                    </div>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockForm}`
                        } ${cn.blockSecond}`}
                    >
                        <label>Фамилия</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                            placeholder={profileData.lastName}
                        />
                    </div>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockForm}`
                        } ${cn.blockSix}`}
                    >
                        <label>Адрес</label>
                        <input
                            type="text"
                            value={address}
                            onChange={event => setAddress(event.target.value)}
                            placeholder={profileData.address}
                        />
                    </div>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockForm}`
                        } ${cn.blockThird}`}
                    >
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            placeholder={profileData.email}
                        />
                    </div>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockForm}`
                        } ${cn.blockFourth}`}
                    >
                        <label>Телефон</label>
                        <input
                            type="number"
                            value={phoneNumber}
                            onChange={event => setPhoneNumber(event.target.value)}
                            placeholder={profileData.phoneNumber}
                        />
                    </div>
                    <div
                        className={`${
                            !changeForm ? `${cn.profileBlock}` : `${cn.profileBlockFormButton}`
                        } ${cn.blockFiftieth}`}
                    >
                        <button type="button" onClick={() => setChangeForm(false)}>
                            Отмена
                        </button>
                        <button onClick={handlerSaveValue}>Сохранить изменения</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={`${cn.profileBlock} ${cn.blockFirst}`}>
                        <p className={cn.profileTitle}>ФИО</p>
                        <p className={cn.profileData}>
                            {profileData.firstName
                                ? `${profileData.firstName} ${profileData.lastName}`
                                : 'Поле не заполнено'}
                        </p>
                    </div>
                    <div className={`${cn.profileBlock} ${cn.blockSecond}`}>
                        <p className={cn.profileTitle}>Адрес</p>
                        <p className={cn.profileData}>
                            {!profileData.address ? 'Поле не заполнено' : `${profileData.address}`}
                        </p>
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
                            {!profileData.phoneNumber
                                ? 'Поле не заполнено'
                                : `${profileData.phoneNumber}`}
                        </p>
                    </div>
                    <div className={` ${cn.profileBlock} ${cn.blockFiftieth}`}>
                        <ChangePasswordForm
                            submitHandler={submitHandler}
                            changeHandler={changeHandler}
                            newPassword={newPassword}
                            confirmPassword={confirmPassword}
                            oldPassword={oldPassword}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
