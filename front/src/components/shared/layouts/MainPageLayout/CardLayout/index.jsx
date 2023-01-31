import React from 'react';
import Card from "../../../../core/Card/index.jsx";

import './mainLayout.scss'

function CardLayout() {
    return (
        <div className="index-catalog">
            <h3></h3>
            <div className="short-catalog__wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    );
}

export default CardLayout;