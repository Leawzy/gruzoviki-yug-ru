import { Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';
import { HelpOutlineIcon } from '../../../utils/getIcons';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

interface propertyObjectIF {
    [key: string]: string;
}

interface itemIF {
    key: string;
    value: string;
}

type ArrayType = itemIF[];

function CategoryAdd() {
    const [array, setArray] = useState([{ key: '', value: '' }]);
    const [titleCategory, setTitleCategory] = useState('');
    const route = useRouter();

    const cancelCreate = async () => {
        await route.replace('/admin/admindashboard');
    };

    const createCategory = useCallback(async () => {
        setAuthToken();
        try {
            const propertyObj: propertyObjectIF = {};
            array.forEach(item => {
                propertyObj[item.key] = `${item.value}:`;
            });
            const res = await adminFetch('/category/create', {
                method: 'post',
                data: {
                    title: titleCategory,
                    property: propertyObj,
                },
            });
            if (res.status === 200) {
                toast.success('Категория успешна создана', {
                    position: 'bottom-right',
                    autoClose: 3400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                await route.replace('/controlpanel');
            } else {
                toast.error('Ошибка в создании категории', {
                    position: 'bottom-right',
                    autoClose: 3400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (e) {
            console.error(e);
        }
    }, [array, titleCategory]);

    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitleCategory(e.target.value);
    }, []);

    const handleChange = useCallback(
        (i: number, event: { target: { name: string; value: string } }) => {
            const { name, value } = event.target;
            const newArray: ArrayType = [...array];
            newArray[i] = { ...newArray[i], [name]: value };
            setArray(newArray);
        },
        [array]
    );

    function handleAdd() {
        setArray([...array, { key: '', value: '' }]);
    }

    const keyValue =
        'Данное поле должно быть названо обязательно на английском языке, и в таком формате: ExampleName. (то есть, все слова слитно пишутся, и каждая буква нового слова начинается с большой буквы)';

    const textValue =
        'Данное поле может быть на любом языке. Тут вы указываете то, что будет выводиться на странице товара. Будь это длина, ширина или другая характеристика продукта.';

    return (
        <div className={cn.categoryAddBlock}>
            <h1>Создание Категории</h1>
            <ToastContainer />
            <input
                className={cn.inputNameCategory}
                onChange={handleTitleChange}
                placeholder="Название категории"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '520px' }} />
            {array.map((item, i) => (
                <div key={i} className={cn.categoryAddInputs}>
                    <Tooltip title={keyValue}>
                        <HelpOutlineIcon />
                    </Tooltip>
                    <input
                        name="key"
                        value={item.key}
                        onChange={e => handleChange(i, e)}
                        placeholder="Ключ"
                    />
                    <Tooltip title={textValue}>
                        <HelpOutlineIcon />
                    </Tooltip>
                    <input
                        name="value"
                        value={item.value}
                        onChange={e => handleChange(i, e)}
                        placeholder="Значение"
                    />
                </div>
            ))}
            <div>
                <button className={cn.addNewBlock} type="button" onClick={() => handleAdd()}>
                    Добавить элемент
                </button>
            </div>
            <div className={cn.categoryAddButtons}>
                <button onClick={cancelCreate}>Отмена</button>
                <button onClick={createCategory}>Создать категорию</button>
            </div>
        </div>
    );
}

export default withAuth(withAuthAdmin(CategoryAdd));
