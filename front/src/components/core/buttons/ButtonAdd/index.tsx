import React from 'react';

import { ButtonProps } from '../../../../types/ButtonType';
import cn from './style.module.scss';

function ButtonAdd(props: ButtonProps) {
    return <button className={cn.buttonAdd} {...props} />;
}

export default ButtonAdd;
