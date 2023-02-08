import React from 'react';
import Card from './Card/index.jsx'
import {useQuery} from "@tanstack/react-query";

import './mainLayout.scss'

export default function NewCard() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['PopularCards'],
        queryFn: () =>
            fetch('http://localhost:7000/card').then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return 'Загрузка...'

    if (error) return 'An error has occurred: ' + error.message


    return (
        <div className="index-catalog">
            <h3>Популярный товар</h3>
            <div className="short-catalog__wrapper">
                {
                    data.map(item =>
                        <Card
                            key={item.id}
                            title={item.title}
                            sale={item.sale}
                            newItem={item.newItem}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            discount={item.discount}
                        />)
                }
            </div>
        </div>
    );
}