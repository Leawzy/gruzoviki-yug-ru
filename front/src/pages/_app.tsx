import '../styles/index.scss';

import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import React, { useEffect, useState } from 'react';

import { CartStore } from '../mobx/CartStore/cart';
import { CartStoreProvider } from '../mobx/CartStore/CartStoreContext';

if (typeof window !== 'undefined') {
    React.useLayoutEffect = useEffect;
}

type DehydratedProps = { dehydratedState: DehydratedState };

const cartStore = new CartStore();

function MyApp({ Component, pageProps }: AppProps<DehydratedProps>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        useErrorBoundary: true,
                    },
                },
            })
    );

    return (
        // @ts-ignore
        <CartStoreProvider value={cartStore}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <DefaultSeo {...SEO} />
                    <Component {...pageProps} />
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
        </CartStoreProvider>
    );
}

export default MyApp;
