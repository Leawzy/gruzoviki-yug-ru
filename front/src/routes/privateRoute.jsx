import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

function PrivateAuthRoute() {
    const auth = Cookies.get('api_token');

    return(auth ? <Outlet /> : <Navigate to={'/login'} />);
}

function PrivateNoNAuthRoute() {
    const auth = Cookies.get('api_token');

    return (
        auth ? <Navigate to={'/'} /> : <Outlet />
    )
}


export {PrivateAuthRoute, PrivateNoNAuthRoute}