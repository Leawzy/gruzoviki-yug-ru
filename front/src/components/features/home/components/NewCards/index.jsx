import React, {useState} from 'react';
import Card from './Card/index.jsx'
import {useQuery} from "@tanstack/react-query";

import './mainLayout.scss'
import Skeleton from "./SkeletonCards/skeleton.jsx";
import axios from "axios";

function NewCard() {

    const [cartItems, setCartItems] = useState([]);

    const {isLoading, error, data} = useQuery({
        queryKey: ['PopularCards'],
        queryFn: () =>
            fetch('http://localhost:7002/card').then(
                (res) => res.json(),
            ),
    })
    const addToCart = (product) => {
        console.log('Add', cartItems)
        axios.post('', product)
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (isLoading) return <Skeleton/>

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
                            addToCart={addToCart}
                            onClickFav={() => console.log('Была нажата кнопка добавить')}
                        />)
                }
            </div>
        </div>
    );
}

export default NewCard