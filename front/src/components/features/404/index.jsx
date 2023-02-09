import React from 'react';

import cn from './style.module.scss'

function PageNotFoundLayout()
{
    return (
        <div className={cn.pageNot__wrapper}>
            <p>page not find...</p>
        </div>
    );
}

export default PageNotFoundLayout;