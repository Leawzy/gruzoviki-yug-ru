import React from 'react';

import Footer from './Footer';
import Header from './Header';

interface BaseLayoutIF {
    children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutIF) {
    return (
        <div className="wrapper">
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}
