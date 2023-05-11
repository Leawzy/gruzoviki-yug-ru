import React from 'react';
import { ToastContainer } from 'react-toastify';

import { useAdminAddHook } from '../../../hooks/admin/useAdminAddHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function BrandAdd() {
    const { setTitle, handleFileChange, cancelCreate, createHookAdmin } =
        useAdminAddHook('/brand/create');

    return (
        <div className={cn.brandAddBlock}>
            <h1>Создать Бренд</h1>
            <ToastContainer />
            <form className={cn.brandAddForm} onSubmit={e => e.preventDefault()}>
                <input
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Введите имя"
                    required
                />
                <input type="file" accept="image/webp" onChange={handleFileChange} />
                <div className={cn.brandAddButtons}>
                    <button onClick={cancelCreate}>Отмена</button>
                    <button onClick={createHookAdmin}>Создать бренда</button>
                </div>
            </form>
        </div>
    );
}

export default withAuth(withAuthAdmin(BrandAdd));
