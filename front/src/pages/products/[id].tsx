import { useRouter } from 'next/router';
import React from 'react';

function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <h1>Product {id}</h1>
        </div>
    );
}

export default ProductPage;
