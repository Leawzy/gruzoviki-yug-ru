import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function Register() {
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, Setpassword_confirmation] = useState("");

    const navigate = useNavigate();

    const handlerSubmit = (e) => {
        if (password === password_confirmation) {
            e.preventDefault();
            axios.post("http://5.167.50.180:8876/api/register", {
                email,
                password,
                first_name,
                last_name,
                password_confirmation
            }).then(res => {
                const token = res.data.token;
                Cookies.set('token', token, {expires: 7});
                navigate('/profile');
            }).catch(error => {
                console.log(error);
            })
        }
    };

    return (
        <form onSubmit={handlerSubmit}>
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
            <button type="submit">Зарегистрироваться</button>
        </form>
    )
}

export default Register;