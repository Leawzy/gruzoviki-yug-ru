import React from 'react';

import SideBar from './SideBar';
import cn from './style.module.scss';

interface AdminLayoutIF {
    children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutIF) {
    return (
        <div className={cn.adminHome}>
            <SideBar />
            <div className={cn.adminWrapper}>
                <div className={cn.children}>{children}</div>
            </div>
        </div>
    );
}
