import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useCartStore } from '../../../../mobx/CartStore/CartStoreContext';
import { Product } from '../../../../types/ProductType';
import ButtonAdd from '../../../core/buttons/ButtonAdd';
import ButtonRemove from '../../../core/buttons/ButtonRemove';
import BaseLayout from '../../../shared/layouts/BaseLayout';
import cn from './style.module.scss';

interface ProductItemIF {
    product: Product;
}

export default function ProductItem({ product }: ProductItemIF) {
    const store = useCartStore();
    const [itemCount, setItemCount] = useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const item = cartItems.find((item: string) => item.id === product.id);
        if (item) {
            setAddedToCart(true);
        }
    }, [product.id]);

    function setPlusHandler() {
        setItemCount(itemCount + 1);
        if (itemCount >= Number(product.quantity)) {
            setItemCount(Number(product.quantity));
        }
    }

    const handleAddToCart = () => {
        if (product) {
            store.addItem({
                id: product.id,
                title: product.title,
                price: product.price,
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

    function copyLinkOfProduct() {
        const cpLink = window.location.href;
        navigator.clipboard.writeText(cpLink);
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
                        <p className={cn.productPageTopActionLink}>В избранное</p>
                        <button onClick={copyLinkOfProduct} className={cn.productPageTopActionLink}>
                            Поделиться
                        </button>
                        <div className={cn.productPageTopArt}>
                            <p>Артикул: {product.art}</p>
                        </div>
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
                            <p className={cn.productPageInfoSubject}>{product.brand}</p>
                        </span>
                        <span className={cn.productPageInfoText}>
                            Количество:
                            <p className={cn.productPageInfoSubject}>{product.quantity}</p>
                        </span>
                        <div className={cn.productPagePrice}>
                            <p>{product.price} ₽</p>
                        </div>
                        <div className={cn.productPageButtons}>
                            {addedToCart ? (
                                <ButtonRemove onClick={handleRemoveFromCart}>
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
