import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
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

    const currectTime = `${(hour < 12 && 'Доброе утро') || (hour < 17 && 'Добрый день') || 'Добрый вечер'}, `;
    async function fetchRepoData() {
        try {
            const res = await axios.get("http://5.167.50.180:8876/api/test");
            return res.data.data;
        } catch (error) {
            throw new Error(error);
        }
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
            <p>{currectTime + data[0].fio}</p>
            <ProfileLayout
                name={data[0].fio}
                address={data[0].subject}
                email={data[0].email}
                phone={data[0].phone}
            />
            <h2 style={{borderTop: "1px solid grey"}}>Заказы</h2>
        </BaseLayout>
);
}

export default Profile;