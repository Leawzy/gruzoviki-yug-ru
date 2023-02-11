import React from 'react';
import Card from './Card/index.jsx'
import {useQuery} from "@tanstack/react-query";

import './mainLayout.scss'
import Skeleton from "./SkeletonCards/skeleton.jsx";

export default function NewCard() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['PopularCards'],
        queryFn: () =>
            fetch('http://localhost:7000/card').then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return <Skeleton />

    if (error) return 'An error has occurred: ' + error.message


    return (
        <div className="index-catalog">
            <h3>Популярный товар</h3>
            <div className="short-catalog__wrapper">
                {
                    data.map((item, index) =>
                        <Card
                            key={index}
                            title={item.title}
                            sale={item.sale}
                            newItem={item.newItem}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            discount={item.discount}
                            onClickPlus={()=>console.log('Была нажата кнопка добавить')}
                            onClickFav={()=>console.log('Была нажата кнопка добавить')}
                        />)
                }
            </div>
        </div>
    );
}