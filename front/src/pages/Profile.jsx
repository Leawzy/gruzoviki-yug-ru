import React from 'react';
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import ProfileLayout from "../components/shared/layouts/ProfileLayout/index.jsx";

function Profile() {

    const {isLoading, error, data} = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            axios
                .get("http://5.167.50.180:8876/api/test")
                .then((res) => res.data.data),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <BaseLayout>
            <h1>Мой профиль</h1>
            <ProfileLayout
                name={data[0].fio}
                adress={data[0].subject}
                email={data[0].email}
                phone={data[0].phone}
            />
        </BaseLayout>
);
}

export default Profile;