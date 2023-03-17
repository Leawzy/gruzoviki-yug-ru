import React, {useState} from 'react';
import axios from "axios";
import RegisterForm from "../components/core/RegisterForm/RegisterForm.jsx";

function Register() {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [fullname, SetFullname] = useState('')
    const [repassword, SetRePassword] = useState('')

    const emailHandlerManager = (e) => {
        SetEmail(e.target.value)
        console.log(email)
    }

    const fullNameHandlerManager = (e) => {
        SetFullname(e.target.value)
        console.log(fullname)
    }

    const passwordHandlerManager = (e) => {
        SetPassword(e.target.value)
        console.log(password)
    }

    const rePasswordHandlerManager = (e) => {
        SetRePassword(e.target.value)
        console.log(repassword)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
    }

    const sendRegisterAPI = () => {
        if (email === '' && email.length < 0 && fullname === '' && fullname.length < 0 && password === '' && password.length < 0 && repassword === '') {
            alert('Заполните все поля!')
        } else if (password !== repassword) {
            alert('Пароли должны совпадать!')
        } else {
            console.log(password, email)
            axios.post('', {
                fullname: fullname,
                email: email,
                password: password,
                repassword: repassword
            }).then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return <RegisterForm
        sendRegisterAPI={sendRegisterAPI}
        email={email}
        password={password}
        fullname={fullname}
        repassword={repassword}
        handlerSubmit={handlerSubmit}
        passwordHandlerManager={passwordHandlerManager}
        fullNameHandlerManager={fullNameHandlerManager}
        emailHandlerManager={emailHandlerManager}
        rePasswordHandlerManager={rePasswordHandlerManager}
    />
}

export default Register;