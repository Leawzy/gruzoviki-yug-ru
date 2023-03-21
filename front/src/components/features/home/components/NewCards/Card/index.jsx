import React from 'react';
import pictureOfItem from '../../../../../../assets/image/tovar-1.svg'
import './card.scss'
import {Link} from "react-router-dom";

function Card(props) {
    const {title, short_desc, id, price, quantity, brand, isClicked, addToCart, removeFromCart} = props;

    return (
        <div className="short-catalog__item" id={id}>
            <Link to={`/products/${id}`}
                  className="short-catalog__img-link">
                <div className={`short-catalog__lt-info`}>
                    <span
                        className={`short-catalog__new`}>{`Бренд: ${brand}`}</span>
                </div>
                <div className={`short-catalog__lb-info`}>
                    <span className={`short-catalog__discount`}>{`Количество: ${quantity} шт.`}</span>
                </div>
                <img src={pictureOfItem} alt="Catalog Img" className="index__catalog-img"/>
            </Link>
            <div className="short-catalog__price">
                <p className="short-catalog__price-num">{`${price} ₽`}</p>
            </div>
            <div className="short-catalog__item-title">
                <Link to={`/products/${id}`}
                      className="short-catalog__item-link">{title}</Link>
                <p>{short_desc}</p>
            </div>
            <div>
                {isClicked ? (
                    <button onClick={removeFromCart}>Убрать из корзины</button>
                ) : (
                    <button onClick={addToCart}>Добавить в корзину</button>
                )}
            </div>
        </div>
    );
}

export default Card;