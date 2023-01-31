import React from 'react';

import account from '../../../../assets/image/icons/account.svg'
import basket from '../../../../assets/image/icons/basket.svg'
import favorite from '../../../../assets/image/icons/favorite.svg'
import Navbar from "../navbar";

function Header() {
    return (
        <div className='header__center'>
            <div className='container'>
                <div className="header__center-wrapper">
                    <div className='header__logo'>
                        <a href="#" className='header__logo-img'>
                        </a>
                    </div>
                    <Navbar />
                    <div className="header__search">
                        <input className='header__search-input' type="text" placeholder={'Что будем искать?'}/>
                        <button type={'submit'} className='header__search-submit'></button>
                    </div>
                    <div className="header__contact">
                        <div className="header__contact-phone">
                            <a href="#">+8 989 777 42 45</a>
                            <a className="header__contact-timetable">График: 8:00 до 19:00 СБ и ВСК выходной</a>
                        </div>
                    </div>
                    <div>
                        <a href="#" className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={account} alt="account"/>
                        </a>
                        <a href="#" className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={favorite} alt="favorite"/>
                        </a>
                        <a href="#" className="header__link-item">
                            <img className="header__link-item-icon" width={34} height={34} src={basket} alt="basket"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;