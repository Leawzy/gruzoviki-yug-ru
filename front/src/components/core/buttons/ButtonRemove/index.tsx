import React from 'react';

import { ButtonProps } from '../../../../types/ButtonType';
import cn from './style.module.scss';

function ButtonRemove(props: ButtonProps) {
    return <button className={cn.buttonRemove} {...props} />;
}

export default ButtonRemove;
