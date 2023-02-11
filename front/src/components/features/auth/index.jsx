import React from 'react';

function AuthPage() {
    return (
        <div className="main">
            <div className="container1">
                <div className="logo">
                    <p className="ui-logo">UI Login</p>
                </div>
                <div className="titulo">
                    <h1>Bem vindo, João</h1>
                    <p className="sub">Insira seu email e senha para fazer login</p>
                </div>
                <form id="form" className="form">
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Insira seu email"/>
                        <i id="icon2" onClick="eyeClick()" className=""></i>
                        <small>Mensagem de Erro</small>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Insira sua senha"
                        />
                        <i id="icon" onClick="eyeClick()" className=""></i>
                        <small>Mensagem de Erro</small>
                    </div>

                    <div className="lemb-esq">
                        <div className="checkbox">
                            <input type="checkbox" className="checkbox-box"/>
                            <p className="Lembrar">Lembrar login</p>
                        </div>
                        <p className="re_senha">Recuperar senha</p>
                    </div>

                    <button className="button-entrar" type="submit">Entrar</button>
                    <button className="button-criar" type="submit">Criar conta</button>
                </form>
            </div>
            <div className="container2">
                <img src="https://raw.githubusercontent.com/wesleytrindade17/Login-Screen-Desktop/main/img/imagem.jpg"
                     alt="imagem" width="100%" height="100%"/>
            </div>
        </div>
    );
}

export default AuthPage;