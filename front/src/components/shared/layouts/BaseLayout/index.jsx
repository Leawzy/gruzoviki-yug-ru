import React from 'react';
import HeaderLayout from "./HeaderLayout/index.jsx";
import Footer from "./FooterLayout/Footer/index.jsx";

function BaseLayout({children}) {
    return (
        <div>
            <HeaderLayout />
            <div className={'wrapper'}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default BaseLayout;