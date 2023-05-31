import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { SliderTypeIF } from '../../../../types/SliderType';
import cn from './style.module.scss';

interface SliderIF {
    images: SliderTypeIF[];
}

export default function Slider({ images }: SliderIF) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = useCallback(
        (direction: string) => {
            if (direction === 'prev') {
                setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            } else if (direction === 'next') {
                setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }
        },
        [images.length]
    );

    return (
        <div className={cn.imageSlider} key={currentIndex + 1} id={String(currentIndex + 1)}>
            <button className={cn.prevButton} onClick={() => handleClick('prev')}>
                &lt;
            </button>
            {images.map((slide, slideIndex) => (
                <Image
                    key={slide.id}
                    className={cn.sliderImage}
                    width={1200}
                    height={200}
                    src={slide.img}
                    loading="lazy"
                    alt={`Image ${slideIndex + 1}`}
                    style={{ display: slideIndex === currentIndex ? 'block' : 'none' }}
                />
            ))}
            <button className={cn.nextButton} onClick={() => handleClick('next')}>
                &gt;
            </button>
        </div>
    );
}
