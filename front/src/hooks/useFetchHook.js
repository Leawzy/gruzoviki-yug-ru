import { useState, useEffect } from "react";
import axios from "axios";

function useProductList() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchProductList() {
            setIsLoading(true);
            try {
                const res = await axios.get('http://5.167.50.180:8876/api/product_list');
                setData(res.data.data);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        fetchProductList();
    }, []);

    return { isLoading, error, data };
}

export default useProductList;