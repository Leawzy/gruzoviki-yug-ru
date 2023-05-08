import React, { useState } from 'react';

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
        <div>
            <h2>Image Converter</h2>
            <div>
                <label htmlFor="file-input">Choose PNG file:</label>
                <input type="file" id="file-input" accept="image/png" onChange={handleFileChange} />
            </div>
            <button onClick={convertToWebp} disabled={!selectedFile}>
                Convert to WebP
            </button>
            {webpFile && (
                <div>
                    <a href={URL.createObjectURL(webpFile)} download>
                        Download WebP file
                    </a>
                    <img src={URL.createObjectURL(webpFile)} alt="WebP preview" />
                </div>
            )}
        </div>
    );
}

export default ImageConverter;
