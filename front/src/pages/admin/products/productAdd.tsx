import React, { FormEvent, useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { adminFetch } from '../../../axios/global';
import { useGetBrandHook } from '../../../hooks/useGetBrandHook';
import { useGetCategoryHook } from '../../../hooks/useGetCategoryHook';
import { CategoryTypeIF } from '../../../types/CategoryType';

export default function ProductAdd() {
    const { category } = useGetCategoryHook();
    const { brand } = useGetBrandHook();
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [selectedBrand, setSelectedBrand] = useState<number>();
    const [formData, setFormData] = useState({});
    const selectedCategoryData = category[selectedCategory] as CategoryTypeIF;
    const [product, setProduct] = useState({
        title: '',
        price: '',
        shortDesc: '',
        quantity: '',
        art: '',
        isPopular: false,
    });

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type, checked } = e.target;
            const newValue = type === 'checkbox' ? checked : value;

            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: newValue,
            }));
        },
        []
    );

    async function handleSend() {
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

    return (
        <>
            <ToastContainer />
            <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Введите название товара"
            />
            <input
                type="text"
                name="shortDesc"
                value={product.shortDesc}
                onChange={handleChange}
                placeholder="Введите короткое описание товара"
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Введите цену товара"
            />
            <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Введите количество товара"
            />
            <input
                type="number"
                name="art"
                value={product.art}
                onChange={handleChange}
                placeholder="Введите артикул товара"
            />
            <div>
                <input
                    type="checkbox"
                    name="isPopular"
                    checked={product.isPopular}
                    onChange={handleChange}
                />
                <label htmlFor="isPopular">Популярный ли товар?</label>
            </div>
            <select onChange={event => setSelectedBrand(Number(event.target.value))}>
                <option disabled selected>
                    Выберете Бренд
                </option>
                {brand.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            <select onChange={event => setSelectedCategory(Number(event.target.value))}>
                <option disabled selected>
                    Выберете Категорию
                </option>
                {category.map(item => (
                    <option value={item.id - 1} key={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            <div>
                {selectedCategoryData?.property && (
                    <div>
                        {Object.entries(selectedCategoryData.property).map(([key, label]) => (
                            <div key={key}>
                                <label htmlFor={key}>{label}</label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button onClick={handleSend}>Send</button>
        </>
    );
}
