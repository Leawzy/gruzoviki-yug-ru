import React, {useState} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import {useNavigate} from "react-router-dom";

import './profile.scss'

import ProfileForm from "../../../core/ProfileForm/ProfileForm.jsx";


function ProfileLayout({name, address, email, phone, lastname}) {

    const navigate = useNavigate();
    const [old_password, setOldPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
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

        if (new_password !== confirmPassword) {
            alert('Вы не смогли потвердить новый пароль. Проверьте их схожесть')
            return;
        }
        try {
            const response = await axios.post('http://5.167.50.180:8876/api/change_password', {
                old_password,
                new_password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('api_token')}`,
                }
            });
            Cookies.remove("api_token")
            navigate('/');
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="profile__container">
            <div className="profile__block block-1">
                <p className="profile__title">ФИО</p>
                <p className="profile__data">{`${name} ${lastname}`}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-2">
                <p className="profile__title">Адрес</p>
                <p className="profile__data">{!address ? 'Поле не заполнено': `${address}`}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-3">
                <p className="profile__title">Email</p>
                <p className="profile__data">{!email ? 'Поле не заполнено': `${email}`}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-4">
                <p className="profile__title">Телефон</p>
                <p className="profile__data">{!phone ? 'Поле не заполнено': `${phone}`}</p>
                <button>Редактировать</button>
            </div>
            <div className="block-5 profile__block">
                <ProfileForm
                    oldPassword={old_password}
                    newPassword={new_password}
                    confirmPassword={confirmPassword}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        </div>
    );
}

export default ProfileLayout;