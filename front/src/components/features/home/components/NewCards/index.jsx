import React from 'react';
import './mainLayout.scss'

import Card from './Card/index.jsx'
import Skeleton from "./SkeletonCards/skeleton.jsx";
import useProductList from "../../../../../hooks/useFetchHook.js";


function NewCard() {

    const { isLoading, error, data } = useProductList();

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

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