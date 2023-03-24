import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import pictureOfItem from '../assets/image/tovar-1.svg'
import '../config.scss';
import ZoomImage from "../components/core/ZoomImage/ZoomImage.jsx";
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";

function useFetchRepoData(id) {
    return useQuery({
        queryKey: ['ProductCard', id],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://5.167.50.180:8876/api/card/${id}`);
                return res.data.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });
}

function Product() {
    const {id} = useParams();
    const {isLoading, error, data} = useFetchRepoData(id);

    useEffect(() => {
        document.title = data ? data.title : 'Loading...';
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <BaseLayout>
            <div className="product__wrapper">
                <div className={'product__card'}>
                    <div className={'product__card-img'}>
                        <ZoomImage src={pictureOfItem}/>
                    </div>
                    <div className={'product__card-info'}>
                        <h1 className={'product__card-info-title'}>{data.title}</h1>
                        <div className={'border'}></div>
                        <p className={'product__card-info-sd'}>{data.short_desc}</p>
                        {
                            data.property.map((e, index) =>
                                <div key={index}>
                                    <>
                                        <h2>FAFA</h2>
                                        <p>{e?.description}</p>
                                        <p>{e?.size}</p>
                                        <p>{e?.warranty}</p>
                                        <p>{e?.country}</p>
                                        <p>{e?.start_date}</p>
                                    </>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Product;