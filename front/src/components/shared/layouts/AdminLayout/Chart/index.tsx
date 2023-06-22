import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { useGetUserHook } from '../../../../../hooks/admin/useGetUserHook';

export default function RenderLineChart() {
    const { users } = useGetUserHook();
    const totalUser = String(users.length);
    const data = [{ name: 'Пользователи', uv: totalUser, pv: 5400, amt: 5400 }];

    return (
        <LineChart
            width={1600}
            height={400}
            data={data}
            margin={{ top: 50, right: 20, bottom: 5, left: 0 }}
        >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}
