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
import { Provider } from 'react-redux';
import {store} from "./redux/store.js";
import {PrivateAuthRoute, PrivateNoNAuthRoute} from "./routes/privateRoute.jsx";
import NewsPost from "./pages/NewsPost.jsx";
import Privacy from "./pages/Privacy.jsx";
import Tos from "./pages/Tos.jsx";
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PrivateAuthRoute/>}>
                            <Route path={'/profile'} element={<Profile/>} />
                        </Route>
                        <Route element={<PrivateNoNAuthRoute/>}>
                            <Route path={'/login'} element={<Auth />} />
                            <Route path={'/register'} element={<Register />} />
                        </Route>
                        <Route path={'/'} element={<Home />} />
                        <Route path={'/cart'} element={<Cart />} />
                        <Route path={'/products/:id'} element={<Product />} />
                        <Route path={'/news/:id'} element={<NewsPost />} />
                        <Route path={'/catalog'} element={<Catalog />} />
                        <Route path={'/privacy'} element={<Privacy />} />
                        <Route path={'/tos'} element={<Tos />} />
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
