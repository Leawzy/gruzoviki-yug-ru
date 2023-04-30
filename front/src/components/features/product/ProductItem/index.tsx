import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { addToCart, removeFromCart } from '../../../../redux/actions';
import { Product } from '../../../../types/ProductType';
import ButtonAdd from '../../../core/buttons/ButtonAdd';
import ButtonRemove from '../../../core/buttons/ButtonRemove';
import BaseLayout from '../../../shared/layouts/BaseLayout';
import cn from './style.module.scss';

interface ProductItemIF {
    product: Product;
}

export default function ProductItem({ product }: ProductItemIF) {
    const [itemCount, setItemCount] = useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as Product[];
        const item = cartItems.find((item: Product) => item.id === product.id);
        if (item) {
            setAddedToCart(true);
        }
    }, [product.id]);

    console.log(product);

    const handleAddToCart = () => {
        setAddedToCart(true);
        dispatch(
            addToCart(
                product.id,
                product.title,
                product.price,
                product.img,
                Boolean(true),
                itemCount
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

    return (
        <BaseLayout>
            <ToastContainer />
            <div className={cn.productPage}>
                <div className={cn.productPageTop}>
                    <h1>{product.title}</h1>
                    <div className={cn.productPageTopAction}>
                        <div className={cn.productPageTopArt}>
                            <p>Артикул: {product.art}</p>
                        </div>
                    </div>
                </div>
                <div className={cn.productPageBottom}>
                    <div className={cn.productPageBottomInfo}>
                        <p className={cn.productPageBottomBrand}>{product.brand.title}</p>
                        {product.popular === 1 ? (
                            <p className={cn.productPageBottomPopular}>Популярный товар</p>
                        ) : (
                            ''
                        )}
                        {product.quantity >= 1 ? (
                            <p className={cn.productPageBottomCheckIs}>В наличие</p>
                        ) : (
                            <p className={cn.productPageBottomNoCheckIs}>Нет в наличие</p>
                        )}
                    </div>
                    <div className={cn.productPageBottomLinks}>
                        <p className={cn.productPageTopActionLink}>В избранное</p>
                        <button onClick={copyLinkOfProduct} className={cn.productPageTopActionLink}>
                            Поделиться
                        </button>
                    </div>
                </div>
                <div className={cn.productPageWrapper}>
                    <div className={cn.productPageImage}>
                        <Image
                            src={product.img || ''}
                            width={500}
                            height={700}
                            alt="Product Image"
                            priority
                        />
                    </div>
                    <div className={cn.productPageInfo}>
                        <span className={cn.productPageInfoText}>
                            Тип:
                            <p className={cn.productPageInfoSubject}>{product.category?.title}</p>
                        </span>
                        <span className={cn.productPageInfoText}>
                            Бренд:
                            <p className={cn.productPageInfoSubject}>{product.brand.title}</p>
                        </span>
                        <span className={cn.productPageInfoText}>
                            Количество:
                            <p className={cn.productPageInfoSubject}>{product.quantity}</p>
                        </span>
                    </div>
                    <div>
                        <div className={cn.productPagePrice}>
                            <p>{product.price} ₽</p>
                        </div>
                        <div className={cn.productPageButtons}>
                            {addedToCart ? (
                                <ButtonRemove onClick={handleRemoveToCart}>
                                    Удалить с корзины
                                </ButtonRemove>
                            ) : (
                                <ButtonAdd onClick={handleAddToCart}> Добавить в корзину</ButtonAdd>
                            )}
                            <div className={cn.productPageBuyButtons}>
                                <button onClick={setMinusHandler}>-</button>
                                <p>{itemCount}</p>
                                <button onClick={setPlusHandler}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {productData?.property.map((p: PropertyIF) => ( */}
                {/*     <div key={p.id}> */}
                {/*         <p>Страна производитель: {p.country}</p> */}
                {/*         <p>Описание: {p.description}</p> */}
                {/*         <p>{p.warranty}</p> */}
                {/*         <p>{p.start_date}</p> */}
                {/*     </div> */}
                {/* ))} */}
            </div>
        </BaseLayout>
    );
}
