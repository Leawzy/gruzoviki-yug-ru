import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import '../config.scss';

import ZoomImage from "../components/core/ZoomImage/ZoomImage.jsx";
import BaseLayout from "../components/shared/layouts/BaseLayout/index.jsx";
import Tabs from "../components/shared/Tabs/index.jsx";

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
            <div className={'card__wrapper'}>
                <div className={'card__top'}>
                    <div>
                        <ZoomImage src={data.img}/>
                    </div>
                    <div>
                        <h1>{data.title}</h1>
                        <div className={'border'}></div>
                        <p>{data.short_desc}</p>
                    </div>
                </div>
                <div className={'card__bottom'}>
                    {
                        data.property.map((e, index) =>
                            <div key={index}>
                                <Tabs>
                                    <div label="Описание">
                                        <p>{e?.description}</p>
                                    </div>
                                    <div label="Характеристики">
                                       {
                                            e === true ?  <p>`Объем / Размер: ${e?.size}`</p> : ''
                                        }
                                        <p>Гарантия: {e?.warranty}</p>
                                        <p>Страна производитель: {e?.country}</p>
                                        <p>Товар поступил: {e?.start_date}</p>
                                    </div>
                                </Tabs>
                            </div>
                        )
                    }
                </div>
            </div>
        </BaseLayout>
    );
}

export default Product;