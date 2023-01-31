import React from 'react'
import ReactDOM from 'react-dom/client'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {RouterProvider} from "react-router-dom";

import Home from './pages/Home.jsx'

import {router} from "./routes/routes.jsx";
import './config.scss'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
                <Home/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </RouterProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
