import React from 'react';
import Header from "./Header/header/index.jsx";

import './header.scss';

function HeaderLayout() {
    return (
        <header className='header'>
            <Header />
        </header>
    );
}

export default HeaderLayout;