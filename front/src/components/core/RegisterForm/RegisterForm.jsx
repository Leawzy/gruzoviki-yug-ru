import React from 'react';
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

function RegisterForm({
                          handlerSubmit,
                          emailHandlerManager,
                          passwordHandlerManager,
                          rePasswordHandlerManager,
                          fullNameHandlerManager,
                          sendRegisterAPI,
                          email,
                          password,
                          fullname,
                          repassword
                      }) {
    return (
        <form onSubmit={handlerSubmit}>
            <Input
                type="text"
                placeholder={'Введите ФИО'}
                value={fullname}
                onChange={fullNameHandlerManager}/>
            <Input
                type="email"
                placeholder={'Введите email'}
                value={email}
                onChange={emailHandlerManager}/>
            <Input
                type="password"
                placeholder={'Введите пароль'}
                value={password}
                onChange={passwordHandlerManager}/>
            <Input
                type="password"
                placeholder={'Потвердите пароль'}
                value={repassword}
                onChange={rePasswordHandlerManager}/>
            <Button
                type={"submit"}
                onClick={sendRegisterAPI}>Зарегистироваться</Button>
        </form>
    );
}

export default RegisterForm;