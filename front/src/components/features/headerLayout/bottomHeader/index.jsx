import React from 'react';

function bottomHeader() {
    return (
        <div className='header__bottom'>
            <div className='container'>
                <div className='header__bottom-wrapper'>
                    <div className='header__bottom-all'>
                        <a href="#" className='header__all-category-link'>
                            <span className='header__all-category-icon'></span>Все категории
                        </a>
                    </div>
                    <div className='header__bottomNav'>
                        <ul className='header__bottomNav-menu'>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Двигатель</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Система питания</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Система охлаждения</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Сцепление</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Коробка передач</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Рулевое управление</a>
                            </li>
                            <li className='header__bottomNav-item'>
                                <a href="#" className='header__bottomNav-link'>Мост передний и задний</a>
                            </li>
                        </ul>
                    </div>
                    <div className='header__bottomSale'>
                        <ul className='header__bottomSale-menu'>
                            <li className='header__bottomSale-item'>
                                <a href="#" className='header__bottomSale-link'>% Распродажа</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default bottomHeader;