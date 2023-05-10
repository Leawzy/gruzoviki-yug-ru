import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function BrandAdd() {
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const route = useRouter();

    const cancelCreate = async () => {
        await route.replace('/controlpanel');
    };

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'image/webp') {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
            }
        }
    }, []);

    const createBrand = useCallback(async () => {
        setAuthToken();
        if (selectedFile) {
            try {
                const res = await adminFetch('/brand/create', {
                    method: 'post',
                    data: {
                        title,
                        file: selectedFile,
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (res.status === 200) {
                    toast.success('Бренд успешно создан', {
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
        } else {
            toast.error('Выберите фотографию с форматом WEBP', {
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
    }, [selectedFile, title]);

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
                    <button onClick={createBrand}>Создать бренда</button>
                </div>
            </form>
        </div>
    );
}

export default withAuth(withAuthAdmin(BrandAdd));
