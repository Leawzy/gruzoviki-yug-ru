import React from 'react';
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

function AuthForm({handlerSubmit, emailHandlerManager, passwordHandlerManager, sendRegisterAPI, email, password}) {
    return (
        <form onSubmit={handlerSubmit}>
            <Input type="text" placeholder={'Введите почту'} value={email} onChange={emailHandlerManager} />
            <Input type="password" placeholder={'Введите пароль'} value={password} onChange={passwordHandlerManager}  />
            <Button type={"submit"} onClick={sendRegisterAPI}>Зарегистироваться</Button>
        </form>
    );
}

export default AuthForm;