import React, { useState } from 'react';

import cn from '../pages/admin/style.module.scss';

function ImageConverter() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [webpFile, setWebpFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        setWebpFile(null);
    };

    const convertToWebp = () => {
        if (!selectedFile) return;
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob(blob => {
                if (!blob) return;
                const webpFileName = `${selectedFile.name}.webp`;
                const webpFile = new File([blob], webpFileName, {
                    type: 'image/webp',
                });
                setWebpFile(webpFile);
            }, 'image/webp');
        };
    };

    return (
        <div className={cn.converterBlock}>
            <h2>Конвертер фотографий</h2>
            <div className={cn.converterFiles}>
                <label htmlFor="file-input">Выберете файл:</label>
                <input type="file" id="file-input" onChange={handleFileChange} />
            </div>
            <button onClick={convertToWebp} disabled={!selectedFile}>
                Конвертация в Webp
            </button>
            {webpFile && (
                <div className={cn.converterFile}>
                    <a href={URL.createObjectURL(webpFile)} download>
                        Скачать файл
                    </a>
                </div>
            )}
        </div>
    );
}

export default ImageConverter;
