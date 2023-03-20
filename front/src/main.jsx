import React from 'react'
import ReactDOM from 'react-dom/client'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './config.scss'

import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Register from "./pages/Register.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Catalog from "./pages/Catalog.jsx";

import {PrivateAuthRoute, PrivateNoNAuthRoute} from "./routes/privateRoute.jsx";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateAuthRoute/>}>
                        <Route path={'/profile'} element={<Profile/>} />
                        <Route path={'/cart'} element={<Cart />} />
                    </Route>
                    <Route element={<PrivateNoNAuthRoute/>}>
                        <Route path={'/login'} element={<Auth />} />
                        <Route path={'/register'} element={<Register />} />
                    </Route>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/products/:id'} element={<Product />} />
                    <Route path={'/catalog'} element={<Catalog />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>
);
