import React, {useState} from 'react';

import pictureOfItem from '../../../../../../assets/image/tovar-1.svg'
import heartFavNeActive from '../../../../../../assets/image/icons/heartFav-neact.svg'
import heartFavActive from '../../../../../../assets/image/icons/heartFav-act.svg'
import plusBtnNeActive from '../../../../../../assets/image/icons/plusBtn-neact.svg'
import plusBtnActive from '../../../../../../assets/image/icons/plusBtn-act.svg'

import './card.scss'

function Card({ title, discount, oldPrice, newItem, price }) {

    const [fav, setFav] = useState(false)
    const [plus, setPlus] = useState(false)

    const onClickFav = () => {
        setFav(!fav);
    }

    const onClickPlus = () => {
        setPlus(!plus);
    }


    let classNameDependsOnDiscount = discount === false ? "hidden" : "";
    let classNameDependsOnOldPrice = oldPrice === false ? "hidden" : "";
    let classNameDependsOnOldNewItem = newItem === false ? "hidden" : "";

    return (
        <div className="short-catalog__item">
            <a href="src/components/features/home/components/NewCards/Card/index.jsx"
               className="short-catalog__img-link">
                <div className={`short-catalog__lt-info`}>
                    <span
                        className={`short-catalog__new ${classNameDependsOnOldNewItem}`}>{newItem ? 'Новинка' : ''}</span>
                </div>
                <div className={`short-catalog__lb-info ${classNameDependsOnDiscount}`}>
                    <span className={`short-catalog__discount`}>{`-${discount}%`}</span>
                </div>
                <img src={pictureOfItem} alt="Catalog Img" className="index__catalog-img"/>
            </a>
            <div className="short-catalog__price">
                <p className="short-catalog__price-num">{`${price} ₽`}</p>
                <s className={`short-catalog__price-s-num ${classNameDependsOnOldPrice}`}>{`${oldPrice} ₽`}</s>
            </div>
            <div className="short-catalog__item-title">
                <a href="src/components/features/home/components/NewCards/Card/index.jsx"
                   className="short-catalog__item-link">{title}</a>
            </div>
            <div>
                <img width={64} onClick={onClickFav} height={64} src={fav ? `${heartFavActive}` : `${heartFavNeActive}`}
                     alt="Favorite button"/>
                <img width={64} height={64} onClick={onClickPlus} src={plus ? `${plusBtnActive}` : `${plusBtnNeActive}`} alt="Plus button"/>
            </div>
        </div>
    );
}

export default Card;