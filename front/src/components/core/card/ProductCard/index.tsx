import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addToCart, removeFromCart } from '../../../../redux/actions';
import { Product } from '../../../../types/ProductType';
import { noPhoto } from '../../../../utils/getImages';
import ButtonAdd from '../../buttons/ButtonAdd';
import ButtonRemove from '../../buttons/ButtonRemove';
import cn from './style.module.scss';

export default function ProductCard({
    id,
    brand,
    quantity,
    img,
    price,
    title,
    shortDesc,
}: Product) {
    const [addedToCart, setAddedToCart] = React.useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as Product[];
        const item = cartItems.find((item: Product) => item.id === id);
        if (item) {
            setAddedToCart(true);
        }
    }, [id]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        dispatch(addToCart(id, title, price, img, Boolean(true), quantity, 1));
    };

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(id));
        setAddedToCart(false);
    };

    return (
        <article className={cn.shortCatalogItem}>
            <Link href={`/products/${id}`} className={cn.shortCatalogItemLink}>
                <div className={cn.shortCatalogItemLeftInfo}>
                    <span className={cn.shortCatalogBrand}>{`Бренд: ${brand.title}`}</span>
                </div>
                <div className={cn.shortCatalogItemRightInfo}>
                    <span className={cn.shortCatalogAmount}>{`Количество: ${quantity} шт.`}</span>
                </div>
                {img === null ? (
                    <Image
                        src={noPhoto}
                        alt="Empty Catalog Img"
                        width={244}
                        height={244}
                        className={cn.catalogImage}
                    />
                ) : (
                    <Image
                        src={img}
                        alt="Catalog Img"
                        width={555}
                        height={410}
                        className={cn.catalogImage}
                    />
                )}
            </Link>
            <div className={cn.shortCatalogPrice}>
                <p className={cn.shortCatalogPriceNum}>{`${price} ₽`}</p>
            </div>
            <div className={cn.shortCatalogTitle}>
                <a className={cn.shortCatalogTitleText}>{title}</a>
                <p>{shortDesc}</p>
            </div>
            <div className={cn.shortButtons}>
                {addedToCart ? (
                    <ButtonRemove onClick={handleRemoveToCart}>Убрать из корзины</ButtonRemove>
                ) : (
                    <ButtonAdd onClick={handleAddToCart}>Добавить в корзину</ButtonAdd>
                )}
            </div>
        </article>
    );
}
