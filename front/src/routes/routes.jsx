import {createBrowserRouter} from 'react-router-dom';
import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/Error-page.jsx";
import Profile from "../pages/Profile.jsx";
import PageNotFound from "../pages/404.jsx";
import Cart from "../pages/Cart.jsx";
import Register from "../pages/Register.jsx";
import Auth from "../pages/Auth.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Auth />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <PageNotFound />
    },
]);