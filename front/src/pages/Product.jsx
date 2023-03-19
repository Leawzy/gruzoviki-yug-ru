import React from 'react';
import { useParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

function Product() {
    const {id} = useParams()

    async function fetchRepoData(id) {
        try {
            const res = await axios.get(`http://5.167.50.180:8876/api/card/${id}`);
            return res.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => fetchRepoData(id),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1></h1>
            <p>ID: {id}</p>
            <p>{data.title}</p>
        </div>
    );
}

export default Product;