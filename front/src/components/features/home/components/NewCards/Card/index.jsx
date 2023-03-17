import React, {useState} from 'react';

import pictureOfItem from '../../../../../../assets/image/tovar-1.svg'
import heartFavNeActive from '../../../../../../assets/image/icons/heartFav-neact.svg'
import heartFavActive from '../../../../../../assets/image/icons/heartFav-act.svg'

import './card.scss'

function Card(props) {

    const [fav, setFav] = useState(false)

    const onClickFav = () => {
        setFav(!fav);
    }


    let classNameDependsOnDiscount = props.discount === false ? "hidden" : "";
    let classNameDependsOnOldPrice = props.oldPrice === false ? "hidden" : "";
    let classNameDependsOnOldNewItem = props.newItem === false ? "hidden" : "";

    return (
        <div className="short-catalog__item">
            <a href="src/components/features/home/components/NewCards/Card/index.jsx"
               className="short-catalog__img-link">
                <div className={`short-catalog__lt-info`}>
                    <span
                        className={`short-catalog__new ${classNameDependsOnOldNewItem}`}>{props.newItem ? 'Новинка' : ''}</span>
                </div>
                <div className={`short-catalog__lb-info ${classNameDependsOnDiscount}`}>
                    <span className={`short-catalog__discount`}>{`-${props.discount}%`}</span>
                </div>
                <img src={pictureOfItem} alt="Catalog Img" className="index__catalog-img"/>
            </a>
            <div className="short-catalog__price">
                <p className="short-catalog__price-num">{`${props.price} ₽`}</p>
                <s className={`short-catalog__price-s-num ${classNameDependsOnOldPrice}`}>{`${props.oldPrice} ₽`}</s>
            </div>
            <div className="short-catalog__item-title">
                <a href="src/components/features/home/components/NewCards/Card/index.jsx"
                   className="short-catalog__item-link">{props.title}</a>
            </div>
            <div>
                <img width={42} height={42} onClick={onClickFav}
                     src={fav ? `${heartFavActive}` : `${heartFavNeActive}`}
                     alt="Favorite button"/>

                <button onClick={() => props.addToCart()}>Add to cart</button>
            </div>
        </div>
    );
}

export default Card;