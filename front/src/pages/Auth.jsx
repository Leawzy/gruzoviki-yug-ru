import React, {useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://5.167.50.180:8876/api/login", {
                email,
                password,
            });
            Cookies.set("api_token", response.data.token);
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Auth;