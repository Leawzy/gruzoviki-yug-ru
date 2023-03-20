import React from 'react';
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <div className='header__centerNav'>
            <ul className='header__centerNav-menu'>
                <li className='header__centerNav-item'>
                    <NavLink to={'/catalog'} className='header__centerNav-link'>Детали</NavLink>
                </li>
                <li className='header__centerNav-item'>
                    <NavLink to={'/catalog'} className='header__centerNav-link'>Акссесуары</NavLink>
                </li>
                <li className='header__centerNav-item'>
                    <NavLink to={'/catalog'} className='header__centerNav-link'>Инстурменты</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;