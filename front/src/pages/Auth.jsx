import React, {useState} from 'react';
import axios from "axios";

import AuthForm from "../components/core/AuthForm/AuthForm.jsx";

function Auth() {

    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    const emailHandlerManager = (e) => {
        SetEmail(e.target.value)
    }

    const passwordHandlerManager = (e) => {
        SetPassword(e.target.value)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
    }

    const sendRegisterAPI = () => {
        console.log(password, email)
        axios.post('', {
            email: email,
            password: password
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }

    return <AuthForm
        sendRegisterAPI={sendRegisterAPI}
        email={email}
        password={password}
        handlerSubmit={handlerSubmit}
        passwordHandlerManager={passwordHandlerManager}
        emailHandlerManager={emailHandlerManager}
    />
}

export default Auth;