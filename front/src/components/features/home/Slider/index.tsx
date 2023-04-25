import Image from 'next/image';
import React, { useState } from 'react';

import cn from './style.module.scss';

interface SliderIF {
    images: string[];
}

export default function Slider({ images }: SliderIF) {
    const [index, setIndex] = useState(0);

    const handleClick = (direction: string) => {
        if (direction === 'prev') {
            setIndex(index === 0 ? images.length - 1 : index - 1);
        } else if (direction === 'next') {
            setIndex(index === images.length - 1 ? 0 : index + 1);
        }
    };

    return (
        <div className={cn.imageSlider} key={index + 1} id={String(index + 1)}>
            <button className={cn.prevButton} onClick={() => handleClick('prev')}>
                &lt;
            </button>
            <Image
                className={cn.sliderImage}
                width={1200}
                height={200}
                src={images[index]}
                priority
                alt={`Image ${index + 1}`}
            />
            <button className={cn.nextButton} onClick={() => handleClick('next')}>
                &gt;
            </button>
        </div>
    );
}
