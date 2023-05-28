import Image from 'next/image';
import React from 'react';

import { useProductItem } from '../../../../hooks/products/useProductItem';
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
    const {
        itemCount,
        addedToCart,
        isFavorite,
        handleToggleFavorite,
        handleAddToCart,
        handleRemoveToCart,
        setPlusHandler,
        setMinusHandler,
        propertyStrings,
        copyLinkOfProduct,
    } = useProductItem({ id: 0, product });

    return (
        <BaseLayout>
            <div className={cn.productPage} key={product.id}>
                <div className={cn.productPageTop}>
                    <h1>{product.title}</h1>
                    <div className={cn.productPageTopAction}>
                        <div className={cn.productPageBottomLinks}>
                            <span className={cn.shortCatalogFavorite}>
                                <button onClick={handleToggleFavorite}>
                                    {isFavorite ? (
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
                        {product.img === null || undefined ? (
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
                                Количество...........
                                <p className={cn.productPageInfoSubject}>{product.quantity}</p>
                            </span>
                        </div>
                        <div className={cn.productPageInfoBottom}>
                            {propertyStrings.map((propString, index) => (
                                <div key={index}>
                                    <p>{propString}</p>
                                </div>
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
