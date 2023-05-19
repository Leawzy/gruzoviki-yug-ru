import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.scss';

import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';
import { fetchFavorites } from '../redux/actions';
import { parseCookies } from 'nookies';

function MyApp({ Component, pageProps }: AppProps) {
    const cookies = parseCookies();
    const { token } = cookies;
    // @ts-ignore
    token ? store.dispatch(fetchFavorites()) : '';
    return (
        <Provider store={store}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
