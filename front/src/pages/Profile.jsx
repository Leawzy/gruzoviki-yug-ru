import React from 'react';
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";

function Profile() {

    const { isLoading, error, data } = useQuery({
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
        <div>
            <h1>Test Data:</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.fio}</li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;