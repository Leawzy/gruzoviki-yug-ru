import { useRouter } from 'next/router';
import React, { FormEvent, useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch } from '../../../axios/global';
import { useHandleFileChangeHook } from '../../../hooks/admin/handlers/useHandleFileChangeHook';
import { useGetBrandHook } from '../../../hooks/admin/useGetBrandHook';
import { useGetCategoryHook } from '../../../hooks/admin/useGetCategoryHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function ProductAdd() {
    const { category } = useGetCategoryHook();
    const route = useRouter();
    const { brand } = useGetBrandHook();
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [selectedBrand, setSelectedBrand] = useState<number>();
    const [formData, setFormData] = useState({});
    const selectedCategoryData =
        selectedCategory !== undefined ? category[selectedCategory] : undefined;
    const { selectedImage, selectedImageUrl, handleFileChange } = useHandleFileChangeHook();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        shortDesc: '',
        quantity: '',
        art: '',
        isPopular: false,
    });

    const cancelCreate = async () => {
        await route.replace('/admin/admindashboard');
    };

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            let newValue: boolean | string;

            if (type === 'checkbox') {
                newValue = (e.target as HTMLInputElement).checked;
            } else {
                newValue = value;
            }

            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: newValue,
            }));
        },
        []
    );

    async function handleSend() {
        if (product.title === '') {
            toast.error('Все поля должны заполнены', {
                position: 'bottom-right',
                autoClose: 3400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            try {
                const res = await adminFetch('/product/create', {
                    method: 'post',
                    data: {
                        title: product.title,
                        price: product.price,
                        shortDesc: product.shortDesc,
                        quantity: product.quantity,
                        art: product.art,
                        isPopular: product.isPopular === false ? '0' : '1',
                        property: formData,
                        brandId: String(selectedBrand),
                        categoryId: String(Number(selectedCategory) + 1),
                        file: selectedImage,
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (res.status === 200) {
                    toast.success('Продукт успешно создан', {
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
    }

    return (
        <div className={cn.productAddBlock}>
            <h1>Создание продукта</h1>
            <div className={cn.productAddWrapper}>
                <div className={cn.productAddLeft}>
                    <ToastContainer />
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        placeholder="Введите название товара"
                        required
                    />
                    <input
                        type="text"
                        name="shortDesc"
                        value={product.shortDesc}
                        onChange={handleChange}
                        placeholder="Введите короткое описание товара"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Введите цену товара"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Введите количество товара"
                        required
                    />
                    <input
                        type="number"
                        name="art"
                        value={product.art}
                        onChange={handleChange}
                        placeholder="Введите артикул товара"
                        required
                    />
                    <div className={cn.productAddBlockFlag}>
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={product.isPopular}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="isPopular">Популярный ли товар?</label>
                    </div>
                    <input type="file" accept="image/webp" onChange={handleFileChange} />
                    {selectedImageUrl === undefined ? (
                        ''
                    ) : (
                        <img src={selectedImageUrl} alt="Выбранное изображение" />
                    )}
                </div>
                <div className={cn.productAddRight}>
                    <select
                        value="selectedOption"
                        onChange={event => setSelectedBrand(Number(event.target.value))}
                    >
                        <option value="selectedOption" disabled selected>
                            Выберете Бренд
                        </option>
                        {brand.map(item => (
                            <option value={item.id} key={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <select
                        value="selectedOption"
                        onChange={event => setSelectedCategory(Number(event.target.value))}
                    >
                        <option value="selectedOption" disabled selected>
                            Выберете Категорию
                        </option>
                        {category.map(item => (
                            <option value={item.id - 1} key={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    {selectedCategoryData?.property && (
                        <div className={cn.productAddBlockCategory}>
                            {Object.entries(selectedCategoryData.property).map(([key, label]) => (
                                <div key={key}>
                                    <label htmlFor={key}>{label}</label>
                                    <input
                                        type="text"
                                        id={key}
                                        name={key}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <button className={cn.productAddCancelButton} onClick={cancelCreate}>
                        Отмена
                    </button>
                    <button className={cn.productAddCreateButton} onClick={handleSend}>
                        Создать продукт
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAuth(withAuthAdmin(ProductAdd));
