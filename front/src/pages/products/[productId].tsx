import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { apiFetch } from '../../axios/global';
import BaseLayout from '../../components/shared/layouts/BaseLayout';
import { useCartStore } from '../../mobx/CartStore/CartStoreContext';
import { Product, PropertyIF } from '../../types/ProductType';
import cn from './style.module.scss';

interface Props {
    product: Product;
}

interface DataIF {
    property: PropertyIF[];
}

export default function ProductPage({ product }: Props) {
    const store = useCartStore();
    const [itemCount, setItemCount] = useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);
    const router = useRouter();

    // @ts-ignore
    const productData: DataIF = product.data;

    function setPlusHandler() {
        setItemCount(itemCount + 1);
        if (itemCount >= Number(product.data?.quantity)) {
            setItemCount(Number(product.data?.quantity));
        }
    }

    const handleAddToCart = () => {
        if (product && product.data) {
            store.addItem({
                id: product.data.id,
                title: product.data.title,
                price: product.data.price,
                quantity: itemCount,
            });
            setAddedToCart(true);
        }
    };

    const handleRemoveFromCart = () => {
        store.removeItem(product.id);
        setAddedToCart(false);
    };

    function setMinusHandler() {
        setItemCount(itemCount - 1);
        if (itemCount <= 1) {
            setItemCount(1);
        }
    }

    if (router.isFallback) {
        return <div>Загрузка...</div>;
    }

    return (
        <BaseLayout>
            <div className={cn.productPage}>
                <div className={cn.productPageTop}>
                    <h1>{product.data?.title}</h1>
                    <div className={cn.productPageTopAction}>
                        <p className={cn.productPageTopActionLink}>В избранное</p>
                        <p className={cn.productPageTopActionLink}>Поделиться</p>
                        <div className={cn.productPageTopArt}>
                            <p>Артикул: {product.data?.art}</p>
                        </div>
                    </div>
                </div>
                <div className={cn.productPageWrapper}>
                    <div className={cn.productPageImage}>
                        <Image
                            src={product.data?.img || ''}
                            width={500}
                            height={700}
                            alt="Product Image"
                            priority
                        />
                    </div>
                    <div className={cn.productPageInfo}>
                        <span className={cn.productPageInfoText}>
                            Тип:
                            <p className={cn.productPageInfoSubject}>
                                {product.data?.category.title}
                            </p>
                        </span>
                        <span className={cn.productPageInfoText}>
                            Бренд:
                            <p className={cn.productPageInfoSubject}>{product.data?.brand}</p>
                        </span>
                        <span className={cn.productPageInfoText}>
                            Количество:
                            <p className={cn.productPageInfoSubject}>{product.data?.quantity}</p>
                        </span>
                        <div className={cn.productPagePrice}>
                            <p>{product.data?.price} ₽</p>
                        </div>
                        <div className={cn.productPageButtons}>
                            {addedToCart ? (
                                <button
                                    className={cn.removeFromCart}
                                    onClick={handleRemoveFromCart}
                                >
                                    Убрать из корзины
                                </button>
                            ) : (
                                <button className={cn.AddToCart} onClick={handleAddToCart}>
                                    Добавить в корзину
                                </button>
                            )}
                            <div className={cn.productPageBuyButtons}>
                                <button onClick={setMinusHandler}>-</button>
                                <p>{itemCount}</p>
                                <button onClick={setPlusHandler}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                {productData?.property.map((p: PropertyIF) => (
                    <div key={p.id}>
                        <p>Страна производитель: {p.country}</p>
                        <p>Описание: {p.description}</p>
                        <p>{p.warranty}</p>
                        <p>{p.start_date}</p>
                    </div>
                ))}
            </div>
        </BaseLayout>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const productId = params?.productId;
    if (!productId) {
        return { notFound: true };
    }

    const response = await apiFetch(`/api/card/${String(productId)}`);
    const product: Product = response.data as Product;

    return {
        props: {
            product,
        },
    };
};
