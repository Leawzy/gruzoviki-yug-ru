import React, { useCallback, useState } from 'react';

export const useHandleFileChangeHook = () => {
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(undefined);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'image/webp') {
                setSelectedImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setSelectedImage(undefined);
                setSelectedImageUrl(undefined);
            }
        }
    }, []);

    return { selectedImage, selectedImageUrl, handleFileChange };
};
