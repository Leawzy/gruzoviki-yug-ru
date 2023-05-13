import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function NewsAdd() {
    const [title, setTitle] = useState('');
    const [description, SetDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [shortDescription, SetShortDescription] = useState('');
    const route = useRouter();

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'image/webp') {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
            }
        }
    }, []);

    const cancelCreate = async () => {
        await route.replace('/admin/dashboard');
    };

    async function createNewsHandler() {
        setAuthToken();
        try {
            const res = await adminFetch('/post/create', {
                method: 'post',
                data: {
                    title,
                    description,
                    shortDesc: shortDescription,
                    file: selectedFile,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                toast.success('Новость успешна создана', {
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
        <div className={cn.brandAddBlock}>
            <h1>Создать Новость</h1>
            <ToastContainer />
            <form className={cn.brandAddForm} onSubmit={e => e.preventDefault()}>
                <input
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Введите название"
                    required
                />
                <input
                    onChange={e => SetShortDescription(e.target.value)}
                    type="text"
                    placeholder="Введите короткое описание новости"
                    required
                />
                <input
                    onChange={e => SetDescription(e.target.value)}
                    type="text"
                    placeholder="Введите полное описание новости"
                    required
                />
                <input type="file" accept="image/webp" onChange={handleFileChange} />
                <div className={cn.brandAddButtons}>
                    <button onClick={cancelCreate}>Отмена</button>
                    <button onClick={createNewsHandler}>Создать Новость</button>
                </div>
            </form>
        </div>
    );
}

export default withAuth(withAuthAdmin(NewsAdd));
