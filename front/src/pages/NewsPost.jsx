import React, {useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useParams} from "react-router-dom";
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";

function useFetchRepoData(id) {
    return useQuery({
        queryKey: ['NewsPost', id],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://5.167.50.180:8876/api/post/${id}`);
                return res.data.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });
}

function NewsPost() {

    const {id} = useParams();
    const {isLoading, error, data} = useFetchRepoData(id);

    useEffect(() => {
        document.title = data ? data.title : 'Loading...';
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <BaseLayout>
            <p>{data.title}</p>
            <p>{data.description}</p>
        </BaseLayout>
    );
}

export default NewsPost;