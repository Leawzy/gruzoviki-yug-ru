import React, {useState} from 'react';

import './profile.scss'
import axios from "axios";
import ProfileForm from "../../../core/ProfileForm/ProfileForm.jsx";

function ProfileLayout({name, address, email, phone}) {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const changeHandler = (e) => {
        const {name, value} = e.target;
        switch (name) {
            case 'oldPassword':
                setOldPassword(value)
                break;
            case 'newPassword':
                setNewPassword(value)
                break;
            case 'confirmPassword':
                setConfirmPassword(value)
                break;
            default:
                break;
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            alert('Вы не смогли потвердить новый пароль. Проверьте их схожесть')
            return;
        }

        const response = await axios.put('api', {
            oldPassword,
            newPassword
        });

    }

    return (
        <div className="profile__container">
            <div className="profile__block block-1">
                <p className="profile__title">ФИО</p>
                <p className="profile__data">{name}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-2">
                <p className="profile__title">Адрес</p>
                <p className="profile__data">{address}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-3">
                <p className="profile__title">Email</p>
                <p className="profile__data">{email}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-4">
                <p className="profile__title">Телефон</p>
                <p className="profile__data">{phone}</p>
                <button>Редактировать</button>
            </div>
            <div className="block-5 profile__block">
                <ProfileForm
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        </div>
    );
}

export default ProfileLayout;