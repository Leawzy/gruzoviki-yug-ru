import React from 'react';
import HeaderLayout from "../header";
import FooterLayout from "../footer";

function BaseLayout({children}) {
    return (
        <div>
            <HeaderLayout />
            <div>
                {children}
            </div>
            <FooterLayout />
        </div>
    );
}

export default BaseLayout;