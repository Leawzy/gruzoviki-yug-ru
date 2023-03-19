import React from 'react';
import Card from './Card/index.jsx'
import {useQuery} from "@tanstack/react-query";

import './mainLayout.scss'
import Skeleton from "./SkeletonCards/skeleton.jsx";
import axios from "axios";

function NewCard() {

    async function fetchRepoData() {
        try {
            const res = await axios.get("http://5.167.50.180:8876/api/product_list");
            return res.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: fetchRepoData,
    });

    if (isLoading) return <Skeleton/>

    if (error) return 'An error has occurred: ' + error.message


    return (
        <div className="index-catalog">
            <h3>Популярный товар</h3>
            <div className="short-catalog__wrapper">
                {
                    data.map((item, index) =>
                        <Card
                            item={item.data}
                            key={index}
                            id={item.id}
                            short_desc={item.short_desc}
                            quantity={item.quantity}
                            brand={item.brand}
                            title={item.title}
                            sale={item.sale}
                            price={item.price}
                        />)
                }
            </div>
        </div>
    );
}

export default NewCard