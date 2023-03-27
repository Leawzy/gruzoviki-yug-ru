import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useFetchAdminData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchAdminData() {
            setIsLoading(true);
            try {
                const res = await axios.get("http://5.167.50.180:8876/api/test", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('admin_token')}`,
                    }
                });
                setData(res.data.data);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }

        fetchAdminData()
    }, []);

    return { isLoading, error, data };
}

export {useFetchAdminData}