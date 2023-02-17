import React from 'react';
import {useQuery} from "@tanstack/react-query";
import Card from "../components/features/home/components/NewCards/Card/index.jsx";

function Cart() {
    const {error, data} = useQuery({
        queryKey: ['CartItems'],
        queryFn: () =>
            fetch('http://localhost:7002/product').then(
                (res) => res.json(),
            ),
    })

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)

    return (
        <>
            {data && data.map(item =>
                <Card
                    key={item.id}
                    title={item.title}
                />
            )}
        </>
    );

}

export default Cart;