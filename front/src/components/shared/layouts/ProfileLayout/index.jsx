import React from 'react';

import './profile.scss'

function ProfileLayout({name, adress, email, phone}) {
    return (
        <div className="profile__container">
            <div className="profile__block block-1">
                <p className="profile__title">ФИО</p>
                <p className="profile__data">{name}</p>
                <button>Редактировать</button>
            </div>
            <div className="profile__block block-2">
                <p className="profile__title">Адрес</p>
                <p className="profile__data">{adress}</p>
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
            <div className="block-5">5</div>
        </div>
    );
}

export default ProfileLayout;