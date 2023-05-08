import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';

interface propertyObjectIF {
    [key: string]: string;
}

interface itemIF {
    key: string;
    value: string;
}

type ArrayType = itemIF[];

export default function CategoryAdd() {
    const [array, setArray] = useState([{ key: '', value: '' }]);
    const [titleCategory, setTitleCategory] = useState('');

    async function createCategory() {
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
            } else {
                toast.success('Ошибка в создании категории', {
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
    }

    function handleChange(i: number, event: { target: { name: string; value: string } }): void {
        const { name, value } = event.target;
        const newArray: ArrayType = [...array];
        newArray[i] = { ...newArray[i], [name]: value };
        setArray(newArray);
    }

    function handleAdd() {
        setArray([...array, { key: '', value: '' }]);
    }
    return (
        <div>
            <ToastContainer />
            <input
                onChange={e => setTitleCategory(e.target.value)}
                placeholder="Название категории"
            />
            {array.map((item, i) => (
                <div key={i}>
                    <input
                        name="key"
                        value={item.key}
                        onChange={e => handleChange(i, e)}
                        placeholder="Key"
                    />
                    <input
                        name="value"
                        value={item.value}
                        onChange={e => handleChange(i, e)}
                        placeholder="Value"
                    />
                </div>
            ))}
            <button type="button" onClick={() => handleAdd()}>
                Добавить элемент
            </button>
            <button onClick={createCategory}>Создать категорию</button>
        </div>
    );
}
