import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { useGetFavoriteHook } from '../../../../hooks/favorites/useGetFavoriteHook';
import { addToCart, removeFromCart } from '../../../../redux/actions';
import { ProductPage } from '../../../../types/ProductType';
import { FavoriteBorderIcon, FavoriteIcon, ShareIcon } from '../../../../utils/getIcons';
import { noPhoto } from '../../../../utils/getImages';
import ButtonAdd from '../../../core/buttons/ButtonAdd';
import ButtonRemove from '../../../core/buttons/ButtonRemove';
import BaseLayout from '../../../shared/layouts/BaseLayout';
import cn from './style.module.scss';

interface ProductItemIF {
    product: ProductPage;
}

export default function ProductItem({ product }: ProductItemIF) {
    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);
    const [IsFavorite, setIsFavorite] = React.useState(false);
    const { property, category } = product;
    const categoryProperties = category.property;
    const { favoriteList } = useGetFavoriteHook();

    useEffect(() => {
        if (favoriteList) {
            if (Array.isArray(favoriteList.products)) {
                favoriteList.products.forEach(item => {
                    // @ts-ignore
                    if (item && typeof item.id === 'number' && item.id === product.id) {
                        setIsFavorite(true);
                    }
                });
            }
        }
    }, [favoriteList, product.id]);

    const propertyStrings = Object.keys(categoryProperties)
        .filter(key => key in property)
        .map(key => `${categoryProperties[key]} ${property[key]}`);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as ProductPage[];
        const item = cartItems.find((item: ProductPage) => item.id === product.id);
        if (item) {
            setAddedToCart(true);
        }
    }, [product.id]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        dispatch(
            addToCart(
                product.id,
                product.title,
                product.price,
                product.img,
                Boolean(true),
                product.quantity,
                itemCount,
                product.art
            )
        );
    };

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(product.id));
        setAddedToCart(false);
    };

    function setPlusHandler() {
        setItemCount(itemCount + 1);
        if (itemCount >= Number(product.quantity)) {
            setItemCount(Number(product.quantity));
        }
    }

    function setMinusHandler() {
        setItemCount(itemCount - 1);
        if (itemCount <= 1) {
            setItemCount(1);
        }
    }

    async function copyLinkOfProduct() {
        const cpLink = window.location.href;
        await navigator.clipboard.writeText(cpLink);
        toast.success('🔗 Ссылка успешна скопирована!', {
            position: 'bottom-right',
            autoClose: 3400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    const handleAddToFavorite = () => {
        setIsFavorite(true);
    };

    return (
        <BaseLayout>
            <ToastContainer />
            <div className={cn.productPage} key={product.id}>
                <div className={cn.productPageTop}>
                    <h1>{product.title}</h1>
                    <div className={cn.productPageTopAction}>
                        <div className={cn.productPageBottomLinks}>
                            <span className={cn.shortCatalogFavorite}>
                                <button onClick={handleAddToFavorite}>
                                    {IsFavorite ? (
                                        <FavoriteIcon className={`${cn.icon} ${cn.iconIsFav}`} />
                                    ) : (
                                        <FavoriteBorderIcon className={cn.icon} />
                                    )}
                                </button>
                            </span>
                            <button
                                onClick={copyLinkOfProduct}
                                className={cn.productPageTopActionLink}
                            >
                                <ShareIcon />
                            </button>
                        </div>
                        <div className={cn.productPageTopArt}>
                            <p>Артикул: {product.art}</p>
                        </div>
                    </div>
                </div>
                <div className={cn.productPageBottom}>
                    <div className={cn.productPageBottomInfo}>
                        <p className={cn.productPageBottomBrand}>{product.brand.title}</p>
                        {product.popular === 1 ? (
                            <p className={cn.productPageBottomPopular}>Популярный товар 🔥</p>
                        ) : (
                            ''
                        )}
                        {product.quantity >= 1 ? (
                            <p className={cn.productPageBottomCheckIs}>В наличие</p>
                        ) : (
                            <p className={cn.productPageBottomNoCheckIs}>Нет в наличие</p>
                        )}
                    </div>
                </div>
                <div className={cn.productPageWrapper}>
                    <div className={cn.productPageImage}>
                        {product.img === null ? (
                            <Image
                                src={noPhoto}
                                alt="Empty Catalog Img"
                                width={400}
                                height={400}
                                className={cn.catalogImage}
                            />
                        ) : (
                            <Image
                                src={product.img}
                                alt="Catalog Img"
                                width={460}
                                height={400}
                                className={cn.catalogImage}
                            />
                        )}
                    </div>
                    <div className={cn.productPageInfo}>
                        <div className={cn.productPageInfoTop}>
                            <span className={cn.productPageInfoText}>
                                Тип..............................
                                <p className={cn.productPageInfoSubject}>
                                    {product.category.title}
                                </p>
                            </span>
                            <span className={cn.productPageInfoText}>
                                Бренд.........................
                                <p className={cn.productPageInfoSubject}>{product.brand.title}</p>
                            </span>
                            <span className={cn.productPageInfoText}>
                                Количество.............
                                <p className={cn.productPageInfoSubject}>{product.quantity}</p>
                            </span>
                        </div>
                        <div className={cn.productPageInfoBottom}>
                            {propertyStrings.map((propString, index) => (
                                <span key={index} className={cn.productPageInfoText}>
                                    <p>{propString}</p>
                                </span>
                            ))}
                        </div>
                        <div>
                            {product.brand.img === null ? (
                                ''
                            ) : (
                                <Image
                                    src={product.brand?.img as string}
                                    width={101}
                                    height={101}
                                    alt="Brand Img"
                                />
                            )}
                        </div>
                    </div>
                    <div className={cn.productPageTotal}>
                        <div className={cn.productPagePrice}>
                            <p>{product.price} ₽</p>
                        </div>
                        {product.quantity === 0 ? (
                            'Товара нет в наличии'
                        ) : (
                            <div className={cn.productPageButtons}>
                                {addedToCart ? (
                                    <ButtonRemove onClick={handleRemoveToCart}>
                                        Удалить с корзины
                                    </ButtonRemove>
                                ) : (
                                    <ButtonAdd onClick={handleAddToCart}>
                                        {' '}
                                        Добавить в корзину
                                    </ButtonAdd>
                                )}
                                <div className={cn.productPageBuyButtons}>
                                    <button
                                        onClick={setMinusHandler}
                                        className={cn.cartPageItemRightMinus}
                                    >
                                        -
                                    </button>
                                    <p>{itemCount}</p>
                                    <button
                                        onClick={setPlusHandler}
                                        className={cn.cartPageItemRightPlus}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
