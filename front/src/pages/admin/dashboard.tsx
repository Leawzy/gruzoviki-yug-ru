import React from 'react';

import AdminLayout from '../../components/shared/layouts/AdminLayout';
import RenderLineChart from '../../components/shared/layouts/AdminLayout/Chart';
import Widget from '../../components/shared/layouts/AdminLayout/Widgets';
import { useGetBrandHook } from '../../hooks/admin/useGetBrandHook';
import { useGetProductsHook } from '../../hooks/admin/useGetProductsHook';
import { useGetUserHook } from '../../hooks/admin/useGetUserHook';
import { withAuth } from '../../utils/withAuth';
import { withAuthAdmin } from '../../utils/withAuthAdmin';
import cn from './style.module.scss';

function Dashboard() {
    const { users } = useGetUserHook();
    const { brand } = useGetBrandHook();
    const { products } = useGetProductsHook();

    return (
        <AdminLayout>
            <div className={cn.adminWidets}>
                <Widget type="user" users={users} brand={brand} products={products} />
                <Widget type="order" users={users} brand={brand} products={products} />
                <Widget type="brands" users={users} brand={brand} products={products} />
                <Widget type="products" users={users} brand={brand} products={products} />
            </div>
            <div>
                <RenderLineChart />
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(Dashboard));
