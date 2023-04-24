import React from 'react';

import News from './News';
import PopularCards from './PopularCards';
import Slider from './Slider';

const images = [
    'http://api.ch32081.tw1.ru/storage/app/public/slider/slide1.png',
    'http://api.ch32081.tw1.ru/storage/app/public/slider/slide2.png',
];

function Home() {
    return (
        <>
            <Slider images={images} />
            <PopularCards />
            <News />
        </>
    );
}

export default Home;
