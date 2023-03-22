import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import account from '../../../../../../../assets/image/icons/account.svg'
import basket from '../../../../../../../assets/image/icons/basket.svg'
import favorite from '../../../../../../../assets/image/icons/favorite.svg'

import Navbar from "../navbar/index.jsx";

function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [redirectToCatalog, setRedirectToCatalog] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCount(cartItems.length);
    }, []);

    useEffect(() => {
        const token = Cookies.get('api_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = () => {
        setRedirectToCatalog(true);
    };

    if (redirectToCatalog) {
        return navigate(`/catalog?search=${searchQuery}`)
    }

    return (
        <div className='header__center'>
            <div className='container'>
                <div className="header__center-wrapper">
                    <div className='header__logo'>
                        <Link to={'/'} className='header__logo-img'>
                        </Link>
                    </div>
                    <Navbar />
                    <form className="header__search">
                        <input className='header__search-input' type="text" placeholder={'Что будем искать?'} value={searchQuery}
                               onChange={handleInputChange}/>
                        <button type={'submit'} onSubmit={handleFormSubmit} className='header__search-submit'></button>
                    </form>
                    <div className="header__contact">
                        <div className="header__contact-phone">
                            <a href="tel:89897774245">+8 989 777 42 45</a>
                            <a className="header__contact-timetable">8:00 до 19:00 СБ и ВСК выходной</a>
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'inline-block'}} className="header__link-item dropmenu">
                            <img className="header__link-item-icon" width={34} height={34} src={account} alt="account"/>
                            <div className="dropmenu-content">
                                {isLoggedIn ? (
                                    <Link to={'/profile'}>Профиль</Link>
                                ) : (
                                    <>
                                        <Link to={"/register"}>Регистрация</Link>
                                        <Link to={"/login"}>Авторизация</Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <Link to={''} className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={favorite} alt="favorite"/>
                        </Link>
                        <Link to={'/cart'} className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={basket} alt="basket"/>
                            <span>{count}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;