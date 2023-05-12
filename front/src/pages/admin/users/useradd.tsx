import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function UserAdd() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('user');
    const route = useRouter();

    const cancelCreate = async () => {
        await route.replace('/admin/admin');
    };

    async function createUserHandler() {
        setAuthToken();
        try {
            const res = await adminFetch('/user/create', {
                method: 'post',
                data: {
                    firstName,
                    lastName,
                    address,
                    password,
                    email,
                    phoneNumber,
                    role,
                },
            });
            if (res.status === 200) {
                toast.success('Пользователь успешно создан', {
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
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={cn.userAddBlock}>
            <h1>Добавить пользователя</h1>
            <ToastContainer />
            <form className={cn.userAddForm} onSubmit={e => e.preventDefault()}>
                <input
                    onChange={e => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Введите имя"
                    required
                />
                <input
                    onChange={e => setLastName(e.target.value)}
                    type="text"
                    placeholder="Введите фамилию"
                    required
                />
                <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Введите почту"
                    required
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Введите пароль"
                    required
                />
                <input
                    onChange={e => setPhoneNumber(e.target.value)}
                    type="text"
                    maxLength={11}
                    placeholder="71234567890"
                />
                <input onChange={e => setAddress(e.target.value)} type="text" placeholder="Адрес" />
                <select onChange={e => setRole(e.target.value)}>
                    <option>Выберете роль</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <div className={cn.userAddButtons}>
                    <button onClick={cancelCreate}>Отмена</button>
                    <button onClick={createUserHandler}>Создать пользователя</button>
                </div>
            </form>
        </div>
    );
}

export default withAuth(withAuthAdmin(UserAdd));
