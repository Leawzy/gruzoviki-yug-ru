import {createBrowserRouter} from 'react-router-dom';
import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/Error-page.jsx";
import Profile from "../pages/Profile.jsx";

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
]);