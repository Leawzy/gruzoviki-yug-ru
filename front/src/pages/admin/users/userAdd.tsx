import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';

export default function UserAdd() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('user');

    async function createUserHandler() {
        setAuthToken();
        try {
            const res = await adminFetch('/user/create', {
                method: 'post',
                data: {
                    firstName,
                    lastName,
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
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={e => e.preventDefault()}>
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
                <select onChange={e => setRole(e.target.value)}>
                    <option>Выберете роль</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={createUserHandler}>Создать пользователя</button>
            </form>
        </div>
    );
}
