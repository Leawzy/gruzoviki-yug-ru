import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { apiFetch } from '../../../../axios/global';
import { useFavoriteStatus } from '../../../../hooks/favorites/useCheckFavoriteHook';
import { addToCart, removeFromCart } from '../../../../redux/actions';
import { ProductCardIF, ProductPage } from '../../../../types/ProductType';
import { FavoriteBorderIcon, FavoriteIcon } from '../../../../utils/getIcons';
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
    art,
    slug,
    shortDesc,
}: ProductCardIF) {
    const [addedToCart, setAddedToCart] = useState(false);
    const cookies = parseCookies();
    const { token } = cookies;
    const dispatch = useDispatch();
    const { isFavorite, setIsFavorite } = useFavoriteStatus(id);

    const handleAddToFavorite = async () => {
        try {
            const res = await apiFetch('api/featured/create', {
                method: 'post',
                data: { productId: id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setIsFavorite(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as ProductPage[];
        const item = cartItems.find((item: ProductPage) => item.id === id);
        if (item) {
            setAddedToCart(true);
        }
    }, [id]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        dispatch(addToCart(id, title, price, img, Boolean(true), quantity, 1, art));
    };

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(id));
        setAddedToCart(false);
    };

    return (
        <article className={cn.shortCatalogItem}>
            <Link href={`/products/${id}-${slug}`} className={cn.shortCatalogItemLink}>
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
                <span className={cn.shortCatalogFavorite}>
                    <button onClick={handleAddToFavorite}>
                        {isFavorite ? (
                            <FavoriteIcon className={`${cn.icon} ${cn.iconIsFav}`} />
                        ) : (
                            <FavoriteBorderIcon className={cn.icon} />
                        )}
                    </button>
                </span>
            </div>
            <div className={cn.shortCatalogTitle}>
                <a className={cn.shortCatalogTitleText}>{title}</a>
                <p>{shortDesc}</p>
            </div>
            <div className={cn.shortButtons}>
                {/* eslint-disable-next-line no-nested-ternary */}
                {quantity === 0 ? (
                    'Товара нет в наличии'
                ) : addedToCart ? (
                    <ButtonRemove onClick={handleRemoveToCart}>Убрать из корзины</ButtonRemove>
                ) : (
                    <ButtonAdd onClick={handleAddToCart}>Добавить в корзину</ButtonAdd>
                )}
            </div>
        </article>
    );
}
