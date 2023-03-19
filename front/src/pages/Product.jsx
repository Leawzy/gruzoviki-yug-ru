import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useFetchRepoData(id) {
    return useQuery({
        queryKey: ['repoData', id],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://5.167.50.180:8876/api/card/${id}`);
                return res.data.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });
}

function Product() {
    const { id } = useParams();
    const { isLoading, error, data } = useFetchRepoData(id);

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
        <div>
            <h1>{data.title}</h1>
            <p>ID: {id}</p>
            <p>{data.short_desc}</p>
        </div>
    );
}

export default Product;