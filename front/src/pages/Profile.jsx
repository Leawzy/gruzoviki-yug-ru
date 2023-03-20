import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import ProfileLayout from "../components/shared/layouts/ProfileLayout/index.jsx";


function Profile() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(()=> {
            setTime(new Date())
        }, 60  * 1000);
        return () => {
            clearInterval(timer)
        }
    }, []);

    const hour = time.getHours();
    const navigate = useNavigate();
    const currectTime = `${(hour < 12 && 'Доброе утро') || (hour < 17 && 'Добрый день') || 'Добрый вечер'}, `;

    async function fetchRepoData() {
        try {
            const res = await axios.get("http://5.167.50.180:8876/api/profile", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('api_token')}`,
                }
            });
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const logoutHandler = () => {
        Cookies.remove("api_token")
        navigate('/');
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: fetchRepoData,
    });

    if(isLoading) {
        return <div> Loading ...</div>
    }

    if (error) {
        return <div>Ошибка загрузки данных</div>;
    }

    return (
        <BaseLayout>
            <h1>Мой профиль</h1>
            <button onClick={logoutHandler}>Выход</button>
            <p>{currectTime + data.first_name}</p>
            <ProfileLayout
                name={data.first_name}
                lastname={data.last_name}
                email={data.email}
            />
            <h2 style={{borderTop: "1px solid grey"}}>Заказы</h2>
        </BaseLayout>
);
}

export default Profile;