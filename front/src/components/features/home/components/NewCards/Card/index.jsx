import React, {useState} from 'react';
import pictureOfItem from '../../../../../../assets/image/tovar-1.svg'
import './card.scss'
import axios from "axios";
import {Link} from "react-router-dom";

function Card(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const [isAddedToCart , setIsAddedToCart] = useState(false)

    const addToCart = async () => {
        try {
            const res = await axios.post("", {
                productID: props.id,
                quantity: 1
            })
            console.log(res)
            if(res.status === 200) {
                setIsAddedToCart(true)
                setQuantity(quantity - 1)
            }
        } catch (err) {
            setIsAddedToCart(true)
            setQuantity(quantity - 1)
            console.log(err)
        }
    }

    const removeFromCart = async () => {
        try {
            const res = await axios.delete("/", {
                productID: props.id,
                productName: props.title
            })
            console.log(res)
            setQuantity(props.quantity)
            setIsAddedToCart(false)
        } catch (err) {
            // TODO: Удалить 42-43 строку
            console.log(err)
            setQuantity(props.quantity)
            setIsAddedToCart(false)
        }
    }

    return (
        <Link to={`/products/${props.id}`}>
            <div className="short-catalog__item" id={props.id}>
                <a href="src/components/features/home/components/NewCards/Card/index.jsx"
                   className="short-catalog__img-link">
                    <div className={`short-catalog__lt-info`}>
                    <span
                        className={`short-catalog__new`}>{`Бренд: ${props.brand}`}</span>
                    </div>
                    <div className={`short-catalog__lb-info`}>
                        <span className={`short-catalog__discount`}>{`Количество: ${quantity}`}</span>
                    </div>
                    <img src={pictureOfItem} alt="Catalog Img" className="index__catalog-img"/>
                </a>
                <div className="short-catalog__price">
                    <p className="short-catalog__price-num">{`${props.price} ₽`}</p>
                </div>
                <div className="short-catalog__item-title">
                    <a href="src/components/features/home/components/NewCards/Card/index.jsx"
                       className="short-catalog__item-link">{props.title}</a>
                    <p>{}</p>
                </div>
                <div>
                    {quantity > 0 && !isAddedToCart && (<button onClick={addToCart}>Добавить в корзину</button>)}
                    {quantity === 0 && <p>Товар закончился</p>}
                    {isAddedToCart && <button onClick={removeFromCart}>Убрать с корзины</button>}
                </div>
            </div>
        </Link>
    );
}

export default Card;