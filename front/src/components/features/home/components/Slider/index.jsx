import React from 'react'
import ImageSlider from "./ImageSlider/imageslider.jsx";

import cn from './style.module.scss';

export default function Slider() {

    const slides = [
        {
            "url": 'http://localhost:5173/src/assets/image/slider/slider1.svg',
            "title": "Title"
        },
        {
            "url": 'http://localhost:5173/src/assets/image/slider/slider2.svg',
            "title": "Title"
        },
    ];


    return (
        <>
            <div className={cn.containerStyles}>
                <ImageSlider slides={slides} />
            </div>
        </>
    );
}