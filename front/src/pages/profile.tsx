import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

import BaseLayout from '../components/shared/layouts/BaseLayout';
import ProfileLayout from '../components/shared/Profile/ProfileLayout';
import { useProfileData } from '../hooks/useGetProfile';
import { withAuth } from '../utils/withAuth';

function ProfilePage() {
    const { profile } = useProfileData();
    const router = useRouter();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const hour = time.getHours();
    const currectTime = `${
        (hour < 12 && 'Доброе утро') || (hour < 17 && 'Добрый день') || 'Добрый вечер'
    }, `;

    const logoutHandler = async () => {
        destroyCookie(null, 'token');
        await router.push('/');
    };

    return (
        <BaseLayout>
            <h1>Мой профиль</h1>
            <button>Редактирование</button>
            <button onClick={logoutHandler}>Выход</button>
            <p>{`${String(currectTime)}${profile.firstName}`}</p>
            <ProfileLayout profile={profile} />
            <h2 style={{ borderTop: '1px solid grey' }}>Заказы</h2>
        </BaseLayout>
    );
}

export default withAuth(ProfilePage);
