import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function Product() {

    const {id} = useParams()
    const [product, setProduct] = useState(null);

    // TODO: Переделать под AXIOS
    useEffect(() => {
        fetch(``)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch((err) => console.log(err))
    }, [id]);

    if (product) { // TODO: !product
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1></h1>
            <p>ID: {id}</p>
        </div>
    );
}

export default Product;