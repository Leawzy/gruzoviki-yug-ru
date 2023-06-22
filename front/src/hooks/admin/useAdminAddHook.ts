import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { adminFetch, setAuthToken } from '../../axios/global';

export function useAdminAddHook(url: string) {
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const route = useRouter();

    const cancelCreate = useCallback(async () => {
        await route.replace('/admin/dashboard');
    }, [route]);

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

    const createHookAdmin = useCallback(async () => {
        setAuthToken();
        if (selectedFile) {
            try {
                const res = await adminFetch(url, {
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
                    await route.replace('/admin/dashboard');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            toast.error('Ошибка! Загрузите картинку', {
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
    }, [selectedFile, title, route]);

    return {
        setTitle,
        handleFileChange,
        cancelCreate,
        createHookAdmin,
    };
}
