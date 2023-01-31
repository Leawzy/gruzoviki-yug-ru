import React from 'react';

import './card.scss'

import tovar from '../../../assets/image/tovar-1.svg'

function Card() {
    return (
        <div className="short-catalog__item">
            <a href="" className="short-catalog__img-link">
                <div className="short-catalog__lt-info">
                    <span className="short-catalog__new">Новинка</span>
                </div>
                <div className="short-catalog__lb-info">
                    <span className="short-catalog__discount">-20%</span>
                </div>
                <img src={tovar} alt="Catalog Img" className="index__catalog-img"/>
            </a>
            <div className="short-catalog__price">
                <p className="short-catalog__price-num">14 300</p>
                <s className="short-catalog__price-s-num">18 300</s>
            </div>
            <div className="short-catalog__item-title">
                <a href="" className="short-catalog__item-link">Масло трансмиссионное. 75W-90 GL-4</a>
            </div>
            <a className='short-catalog__add-cart' href="">В корзину</a>
        </div>
    );
}

export default Card;