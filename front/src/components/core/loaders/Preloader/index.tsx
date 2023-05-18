import React, { CSSProperties } from 'react';
import { RotateLoader } from 'react-spinners';

const override: CSSProperties = {
    margin: '22% 48%',
};

export default function Preloader() {
    return <RotateLoader cssOverride={override} color="#4c96e3" size={15} speedMultiplier={1} />;
}
