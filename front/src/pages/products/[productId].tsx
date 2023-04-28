import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { apiFetch } from '../../axios/global';
import ProductItem from '../../components/features/product/ProductItem';
import { Product } from '../../types/ProductType';

interface Props {
    product: Product;
}

export default function ProductPage({ product }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Загрузка...</div>;
    }

    return <ProductItem product={product} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const productId = params?.productId;
    if (!productId) {
        return { notFound: true };
    }

    const response = await apiFetch(`/api/product/card/${String(productId)}`);
    const product: Product = response.data.data as Product;

    return {
        props: {
            product,
        },
    };
};
