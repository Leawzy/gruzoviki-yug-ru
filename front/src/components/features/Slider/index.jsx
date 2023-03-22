import React, {useState} from 'react'

import './slider.scss'

export default function Slider({ images }) {
    const [index, setIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === 'prev') {
            setIndex(index === 0 ? images.length - 1 : index - 1);
        } else if (direction === 'next') {
            setIndex(index === images.length - 1 ? 0 : index + 1);
        }
    };

    return (
        <div className="image-slider">
            <button className="prev-button" onClick={() => handleClick('prev')}>
                &lt;
            </button>
            <img className="slider-image" width={1200} height={200} src={images[index]} alt={`Image ${index + 1}`} />
            <button className="next-button" onClick={() => handleClick('next')}>
                &gt;
            </button>
        </div>
    );
};