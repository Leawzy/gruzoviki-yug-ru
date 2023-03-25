import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

import '../config.scss'

function Register() {
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, Setpassword_confirmation] = useState("");

    const navigate = useNavigate();

    const handlerSubmit = async (e) => {
        if (password === password_confirmation) {
            e.preventDefault();
            try {
                const res = await axios.post("http://5.167.50.180:8876/api/register", {
                    email,
                    password,
                    first_name,
                    last_name,
                    password_confirmation
                })
                Cookies.set('api_token', res.data.token, {expires: 7});
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form onSubmit={handlerSubmit} className={'FormRegister'}>
            <h1>Регистарция</h1>
            <input
                type="name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ваше имя"
                required
            />
            <input
                type="name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ваша Фамилия"
                required
            />
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
                placeholder="Пароль"
                required
            />
            <input
                type="password"
                value={password_confirmation}
                onChange={(e) => Setpassword_confirmation(e.target.value)}
                placeholder="Повторить пароль"
                required
            />
            <div className={'accept__privacy'}>
                <p>
                    Регистрируясь, вы соглашаетесь с <Link to={'/tos'}>Условиями предоставления услуг</Link> и <Link
                    to={'/privacy'}>Политикой конфиденциальности</Link>, а также с <Link to={'/tos'}>Политикой использования файлов
                    cookie.</Link>
                </p>
            </div>
            <button type="submit">Зарегистрироваться</button>
            <p className={'UnderText'}>Есть аккаунт? - <Link to={'/login'}
                                                             className={'LinkToRegister'}>Авторизируйся!</Link></p>
        </form>
    )
}

export default Register;