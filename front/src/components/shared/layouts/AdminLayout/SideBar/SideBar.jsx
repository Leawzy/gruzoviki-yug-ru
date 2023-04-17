import React from 'react';

import './sidebar.scss'

function SideBar() {
    return (
        <div className={'sidebar'}>
            <div className={'sidebar__top'}>logo</div>
            <div className={'sidebar__center'}>List</div>
            <div className={'sidebar__bottom'}>Color Option</div>
        </div>
    );
}

export default SideBar;