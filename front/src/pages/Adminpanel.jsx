import React from 'react';
import Cookies from "js-cookie";
import {useFetchAdminData} from "../hooks/useFetchAdminHook.js";
import {useNavigate} from "react-router-dom";

function Adminpanel() {
    const navigate = useNavigate()
    const {isLoading, error, data} = useFetchAdminData()

    if (isLoading) {
        return <div>Loading</div>
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <div>
            {
                data.map((item) => {
                    return (
                        <p>{item.fio}</p>
                    )
                })
            }
            <button onClick={() => {
                Cookies.remove('admin_token')
                navigate('/')
            }
            }>LogOut</button>
        </div>
    );
}

export default Adminpanel;