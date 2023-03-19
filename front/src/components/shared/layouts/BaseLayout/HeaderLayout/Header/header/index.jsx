import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { redirect } from "react-router-dom";

import account from '../../../../../../../assets/image/icons/account.svg'
import basket from '../../../../../../../assets/image/icons/basket.svg'
import favorite from '../../../../../../../assets/image/icons/favorite.svg'

import Navbar from "../navbar/index.jsx";

function Header() {

    const [searchQuery, setSearchQuery] = useState('');
    const [redirectToCatalog, setRedirectToCatalog] = useState(false);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setRedirectToCatalog(true);
    };

    if (redirectToCatalog) {
        return redirect(`/catalog?search=${searchQuery}`)
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
                    <div className="header__search">
                        <input className='header__search-input' type="text" placeholder={'Что будем искать?'} value={searchQuery}
                               onChange={handleInputChange}/>
                        <button type={'submit'} className='header__search-submit'></button>
                    </div>
                    <div className="header__contact">
                        <div className="header__contact-phone">
                            <a href="src/components/shared/layouts/BaseLayout/HeaderLayout/Header/header/index.jsx#">+8 989 777 42 45</a>
                            <a className="header__contact-timetable">8:00 до 19:00 СБ и ВСК выходной</a>
                        </div>
                    </div>
                    <div>
                        <Link to={'/profile'} className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={account} alt="account"/>
                        </Link>
                        <Link to={''} className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={favorite} alt="favorite"/>
                        </Link>
                        <Link to={'/cart'} className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={basket} alt="basket"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;