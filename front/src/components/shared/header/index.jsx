import React from 'react';

import './header.scss';
import CenterHeader from "../../features/headerLayout/centerHeader";
import BottomHeader from "../../features/headerLayout/bottomHeader";
import TopHeader from "../../features/headerLayout/topHeader";

function HeaderLayout() {
    return (
        <header className='header'>
            <TopHeader />
            <CenterHeader />
            <BottomHeader />
        </header>
    );
}

export default HeaderLayout;