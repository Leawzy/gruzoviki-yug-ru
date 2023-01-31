import React from 'react';
import HeaderLayout from "../HeaderLayout/index.jsx";
import FooterLayout from "../../../core/Footer/index.jsx";

function BaseLayout({children}) {
    return (
        <div>
            <HeaderLayout />
            <div className={'wrapper'}>
                {children}
            </div>
            <FooterLayout />
        </div>
    );
}

export default BaseLayout;