import React from 'react';

import AdminLayout from '../../components/shared/layouts/AdminLayout';
import RenderLineChart from '../../components/shared/layouts/AdminLayout/Chart';
import Widget from '../../components/shared/layouts/AdminLayout/Widgets';
import { useGetBrandHook } from '../../hooks/admin/useGetBrandHook';
import { useGetProductsHook } from '../../hooks/admin/useGetProductsHook';
import { useGetUserHook } from '../../hooks/admin/useGetUserHook';
import { useGetOrdersHook } from '../../hooks/useGetOrdersHook';
import { withAuth } from '../../utils/withAuth';
import { withAuthAdmin } from '../../utils/withAuthAdmin';
import cn from './style.module.scss';
import widgetsData from './widgetData.json';

function Dashboard() {
    const { users } = useGetUserHook();
    const { brand } = useGetBrandHook();
    const { products } = useGetProductsHook();
    const { orderList } = useGetOrdersHook();

    return (
        <AdminLayout>
            <div className={cn.adminWidets}>
                {widgetsData.map((widget, index) => (
                    <Widget
                        key={widget.type}
                        id={index}
                        type={widget.type}
                        users={users}
                        brand={brand}
                        products={products}
                        orderList={orderList}
                        title={widget.title}
                        link={widget.link}
                    />
                ))}
            </div>
            <div>
                <RenderLineChart />
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(Dashboard));
