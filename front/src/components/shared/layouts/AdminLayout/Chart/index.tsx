import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

export default function RenderLineChart() {
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
