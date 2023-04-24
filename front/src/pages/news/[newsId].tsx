import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { apiFetch } from '../../axios/global';
import BaseLayout from '../../components/shared/layouts/BaseLayout';
import { Product } from '../../types/ProductType';

interface Props {
    product: Product;
}

export default function ProductPage({ product }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <BaseLayout>
            <h1>{product.title}</h1>
            <p>ID: {product.id}</p>
            <p>Description: {product.description}</p>
        </BaseLayout>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const newsId = params?.newsId;
    if (!newsId) {
        return { notFound: true };
    }

    const response = await apiFetch(`/api/post/${String(newsId)}`);
    const product: Product = response.data as Product;

    return {
        props: {
            product,
        },
    };
};
