import React from 'react';

import { ProfileType } from '../../../../types/ProfileType';
import cn from './style.module.scss';

interface ProfileLayoutProps {
    profile: ProfileType;
}

export default function ProfileLayout({ profile }: ProfileLayoutProps) {
    return (
        <div className={cn.profileContainer}>
            <div className={`${cn.profileBlock} ${cn.blockFirst}`}>
                <p className="profile__title">ФИО</p>
                <p className="profile__data">
                    {!profile.firstName
                        ? 'Поле не заполнено'
                        : `${profile.firstName} ${profile.lastName}`}
                </p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockSecond}`}>
                <p className="profile__title">Адрес</p>
                <p className="profile__data">Поле не заполнено</p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockThird}`}>
                <p className="profile__title">Email</p>
                <p className="profile__data">
                    {!profile.email ? 'Поле не заполнено' : `${profile.email}`}
                </p>
            </div>
            <div className={`${cn.profileBlock} ${cn.blockFourth}`}>
                <p className="profile__title">Телефон</p>
                <p className="profile__data">
                    {!profile.phone ? 'Поле не заполнено' : `${profile.phone}`}
                </p>
            </div>
            <div className={` ${cn.profileBlock} ${cn.blockFiftieth}`} />
        </div>
    );
}
