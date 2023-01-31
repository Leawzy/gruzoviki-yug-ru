import React from 'react';
import Card from "../../../core/Card/index.jsx";

import './mainLayout.scss'
import BaseLayout from "../BaseLayout/index.jsx";

function CardLayout() {
    return (
        <BaseLayout>
            <div className="index-catalog">
                <h3></h3>
                <div className="short-catalog__wrapper">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </BaseLayout>
    );
}

export default CardLayout;