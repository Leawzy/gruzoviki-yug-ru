import React, {useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function AdminAuth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const [agreement, setAgreement] = useState(false);
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://5.167.50.180:8876/api/admin_login", {
                login,
                password,
            });
            navigate('/adminpanel')
            if(!agreement) {
                Cookies.set("admin_token", response.data.token, { expires: 1 });
            } else {
                Cookies.set("admin_token", response.data.token, { expires: 7 });
            }
            setError(null)
        } catch (err) {
            console.log(err);
        }
    };

    function saveMe(e) {
        setAgreement(e.target.checked);
    }

    return (
        <form onSubmit={handleLogin} className={'Form'}>
            <h1>Адмнистративная панель</h1>
            <p style={{color: 'red'}}>{error}</p>
            <input
                className={ error === null ? '' : 'error'}
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Логин"
                required
            />
            <input
                className={ error === null ? '' : 'error'}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
            />
            <button type="submit">Авторизоваться</button>
            <input type="checkbox" onChange={saveMe} />Запомнить меня
        </form>
    );
}

export default AdminAuth;