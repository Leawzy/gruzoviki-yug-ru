import React from 'react';

import AdminLayout from '../../components/shared/layouts/AdminLayout';
import Widget from '../../components/shared/layouts/AdminLayout/Widgets';
import { useAdminBrandData, useAdminUserData } from '../../hooks/useAdminHook';
import { withAuth } from '../../utils/withAuth';
import { withAuthAdmin } from '../../utils/withAuthAdmin';
import cn from './style.module.scss';

function AdminHome() {
    const { users } = useAdminUserData();
    const { brand } = useAdminBrandData();

    return (
        <AdminLayout>
            <div className={cn.adminWidets}>
                <Widget type="user" users={users} brand={brand} />
                <Widget type="order" users={users} brand={brand} />
                <Widget type="brands" users={users} brand={brand} />
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(AdminHome));
