import React from 'react';
import tg from "../../../../assets/image/tg.svg";
import vb from "../../../../assets/image/vb.svg";

function centerHeader() {
    return (
        <div className='header__center'>
            <div className='container'>
                <div className="header__center-wrapper">
                    <div className='header__logo'>
                        <a href="#" className='header__logo-img'>
                        </a>
                    </div>
                    <div className='header__centerNav'>
                        <ul className='header__centerNav-menu'>
                            <li className='header__centerNav-item'>
                                <a href="#" className='header__centerNav-link active'>Детали</a>
                            </li>
                            <li className='header__centerNav-item'>
                                <a href="#" className='header__centerNav-link'>Акссесуары</a>
                            </li>
                            <li className='header__centerNav-item'>
                                <a href="#" className='header__centerNav-link'>Инстурменты</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header__search">
                        <input className='header__search-input' type="text" placeholder={'Что будем искать?'}/>
                        <button type={'submit'} className='header__search-submit'></button>
                    </div>
                    <div className="header__social">
                        <a className="header__social-item" href="#" target={'_blank'}>
                            <img src={tg} alt="Telegram"/>
                        </a>
                        <a className="header__social-item" href="#" target={'_blank'}>
                            <img src={vb} alt="Viber"/>
                        </a>
                    </div>
                    <div className="header__contact">
                        <div className="header__contact-phone">
                            <a href="#">+8 989 777 42 45</a>
                            <span> \ </span>
                            <a href="#">+8 989 777 42 45</a>
                        </div>
                    </div>
                    <div className="header__cart">
                        <a href="#" className='header__cart-link'>
                            <span className="header__contact-num">1</span>
                            <div className="header__contact-name">Корзина</div>
                            <div className="header__contact-money">7500</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default centerHeader;