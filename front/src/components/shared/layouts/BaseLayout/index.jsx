import React from 'react';
import HeaderLayout from "./HeaderLayout/index.jsx";
<<<<<<< HEAD
=======
import FooterLayout from "../../../core/Footer/index.jsx";
>>>>>>> origin/master

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