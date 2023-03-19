import React, {useState} from 'react';
import pictureOfItem from '../../../../../../assets/image/tovar-1.svg'
import './card.scss'
import axios from "axios";
import {Link} from "react-router-dom";

function Card(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const [isAddedToCart, setIsAddedToCart] = useState(false)

    const addToCart = async () => {
        try {
            const res = await axios.post("api/cart", {
                productID: props.id,
                quantity: 1
            })
            console.log(res)
            if (res.status === 200) {
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
            const res = await axios.delete("api/cart", {
                productID: props.id
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
        <div className="short-catalog__item" id={props.id}>
            <Link to={`/products/${props.id}`}
                  className="short-catalog__img-link">
                <div className={`short-catalog__lt-info`}>
                    <span
                        className={`short-catalog__new`}>{`Бренд: ${props.brand}`}</span>
                </div>
                <div className={`short-catalog__lb-info`}>
                    <span className={`short-catalog__discount`}>{`Количество: ${quantity}`}</span>
                </div>
                <img src={pictureOfItem} alt="Catalog Img" className="index__catalog-img"/>
            </Link>
            <div className="short-catalog__price">
                <p className="short-catalog__price-num">{`${props.price} ₽`}</p>
            </div>
            <div className="short-catalog__item-title">
                <Link to={`/products/${props.id}`}
                   className="short-catalog__item-link">{props.title}</Link>
                <p>{props.short_desc}</p>
            </div>
            <div>
                {quantity > 0 && !isAddedToCart && (<button onClick={addToCart}>Добавить в корзину</button>)}
                {quantity === 0 && <p>Товар закончился</p>}
                {isAddedToCart && <button onClick={removeFromCart}>Убрать с корзины</button>}
            </div>
        </div>
    );
}

export default Card;