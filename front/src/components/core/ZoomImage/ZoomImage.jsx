import React from 'react';

import './zoom.scss'

function ZoomImage({src}) {
    return (
        <div className="zoom-container">
            <img src={src} alt="Zoom" className="zoom-image" />
            <div className="zoom-lens"></div>
        </div>
    );
}

export default ZoomImage;