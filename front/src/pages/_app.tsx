import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.scss';

import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <DefaultSeo {...SEO} />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                newestOnTop={false}
                rtl={false}
                limit={1}
                closeButton={undefined}
            />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
