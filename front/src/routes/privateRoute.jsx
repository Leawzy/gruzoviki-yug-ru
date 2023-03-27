import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

function PrivateAuthRoute() {
    const auth = Cookies.get('api_token');

    return (auth ? <Outlet/> : <Navigate to={'/login'}/>);
}

function PrivateNoNAuthRoute() {
    const auth = Cookies.get('api_token');
    const authAdmin = Cookies.get('admin_token');

    return (
        auth || authAdmin ? <Navigate to={'/'}/> : <Outlet/>
    )
}

function AdminRoute() {
    const auth = Cookies.get('admin_token');

    return (auth ? <Outlet/> : <Navigate to={'/'}/>);
}


export {PrivateAuthRoute, PrivateNoNAuthRoute, AdminRoute}