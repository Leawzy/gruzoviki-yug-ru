import React, { ChangeEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../../axios/global';

export default function BrandAdd() {
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'image/webp') {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
            }
        }
    };

    async function createBrand() {
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
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={e => e.preventDefault()}>
                <input
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Введите имя"
                    required
                />
                <input type="file" accept="image/webp" onChange={handleFileChange} />
                <button onClick={createBrand}>Создать бренда</button>
            </form>
        </div>
    );
}
