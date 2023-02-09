import React from 'react';
import HeaderLayout from "./HeaderLayout/index.jsx";

function BaseLayout({children}) {
    return (
        <div>
            <HeaderLayout />
            <div className={'wrapper'}>
                {children}
            </div>
        </div>
    );
}

export default BaseLayout;