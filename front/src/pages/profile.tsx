import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

import Preloader from '../components/core/loaders/Preloader';
import BaseLayout from '../components/shared/layouts/BaseLayout';
import ProfileLayout from '../components/shared/Profile/ProfileLayout';
import ProfileOrders from '../components/shared/Profile/ProfileOrders';
import { useProfileData } from '../hooks/admin/useGetProfileHook';
import { useGetOrdersHook } from '../hooks/useGetOrdersHook';
import { withAuth } from '../utils/withAuth';

function ProfilePage() {
    const { profile, loading } = useProfileData();
    const { orderList } = useGetOrdersHook();
    const router = useRouter();
    const [time, setTime] = useState(new Date());
    const [changeForm, setChangeForm] = useState(false);

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

    const handlerLogout = async () => {
        destroyCookie(null, 'token');
        await router.push('/');
    };

    const handlerChangeForm = () => {
        setChangeForm(true);
    };

    if (!loading) {
        return <Preloader />;
    }

    return (
        <BaseLayout>
            <h1 className="profileTitle">Мой профиль</h1>
            <div className="profileHeader">
                <p className="profileHeaderWelcome">
                    👋 {`${String(currectTime)}${String(profile.firstName)}`}
                </p>
                <div>
                    <button className="profileButton" onClick={handlerChangeForm}>
                        Редактирование
                    </button>
                    <button className="profileButton" onClick={handlerLogout}>
                        Выход
                    </button>
                </div>
            </div>
            <ProfileLayout
                profileData={profile}
                changeForm={changeForm}
                setChangeForm={setChangeForm}
            />
            <h2 className="profileTitle" style={{ borderTop: '1px solid grey', padding: '20px 0' }}>
                Заказы
            </h2>
            <div>
                <ProfileOrders orders={orderList} />
            </div>
        </BaseLayout>
    );
}

export default withAuth(ProfilePage);
