import React from 'react';

import { useAdminBrandData, useAdminUserData } from '../../../../hooks/useAdminHook';
import SideBar from './SideBar';
import cn from './style.module.scss';
import Widget from './Widgets';

export default function AdminLayout() {
    const { users } = useAdminUserData();
    const { brand } = useAdminBrandData();

    return (
        <div className={cn.adminHome}>
            <SideBar />
            <div className={cn.adminWrapper}>
                <div className={cn.adminWidets}>
                    <Widget type="user" users={users} brand={brand} />
                    <Widget type="order" users={users} brand={brand} />
                    <Widget type="brands" users={users} brand={brand} />
                </div>
            </div>
        </div>
    );
}
