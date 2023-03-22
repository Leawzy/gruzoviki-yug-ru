import React, {useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";

import '../config.scss'

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
        <form onSubmit={handleLogin} className={'Form'} >
            <h1>Авторизация</h1>
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
            <button type="submit">Авторизоваться</button>
            <p className={'UnderText'}>Нет аккаунта? - <Link to={'/register'} className={'LinkToRegister'}>Зарегистрируйся!</Link></p>
        </form>
    );
}

export default Auth;