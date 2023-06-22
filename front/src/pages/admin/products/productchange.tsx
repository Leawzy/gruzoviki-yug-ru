import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useHandleFileChangeHook } from '../../../hooks/admin/handlers/useHandleFileChangeHook';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeImageHook } from '../../../hooks/admin/handlers/useSendChangeImageHook';
import { useGetProductsHook } from '../../../hooks/admin/useGetProductsHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function ProductChange() {
    const { products } = useGetProductsHook();
    const { selectedImage, selectedImageUrl, handleFileChange } = useHandleFileChangeHook();
    const {
        rows,
        setRows,
        selectedRow,
        setSelectedRow,
        openModal,
        handleOpenModal,
        handleDeleteRow,
        handleCloseModal,
    } = useModalHandlerHook([]);
    const useHandleSaveChanges = async () => {
        try {
            await useSendChangeImageHook(
                '/product/change',
                {
                    id: selectedRow?.id as string,
                    title: selectedRow?.title as string,
                    price: selectedRow?.price as string,
                    quantity: selectedRow?.quantity as string,
                    art: selectedRow?.art as string,
                    categoryId: selectedRow?.categoryId as string,
                    shortDesc: selectedRow?.shortDesc as string,
                },
                'post'
            );
        } catch (e) {
            console.error(e);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', width: 90 },
        { field: 'title', headerName: 'Название', width: 350 },
        { field: 'price', headerName: 'Цена, ₽', width: 120 },
        {
            field: 'quantity',
            headerAlign: 'center',
            align: 'center',
            headerName: 'Кол-во',
            width: 120,
        },
        {
            field: 'popular',
            headerAlign: 'center',
            align: 'center',
            headerName: 'Популярный',
            width: 220,
        },
        {
            field: 'art',
            headerAlign: 'center',
            align: 'center',
            headerName: 'Артикул',
            width: 190,
        },
        {
            field: 'actions',
            headerName: 'Действие',
            headerAlign: 'center',
            align: 'center',
            width: 300,
            renderCell: params => {
                const handleEdit = () => {
                    handleOpenModal(params.id);
                };

                const handleDelete = () => {
                    handleDeleteRow(params.id, 'product/delete');
                };

                return (
                    <>
                        <Button onClick={handleEdit}>Изменить</Button>
                        <Button onClick={handleDelete} color="error">
                            Удалить
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        const formattedRows: GridRowsProp = products.map(item => ({
            id: item.id,
            title: item.title,
            img: item.img,
            art: item.art,
            popular: item.popular === 1 ? 'Популярный товар' : '',
            price: item.price === 0 ? '-' : `${item.price}`,
            quantity: item.quantity,
            shortDesc: item.shortDesc,
            brand: item.brand,
            categoryId: item.category.id,
            brandTitle: item.brand.title,
            categoryTitle: item.category.title,
        }));
        setRows(formattedRows);
    }, [products]);

    return (
        <AdminLayout>
            <div style={{ height: 900, width: '100%' }}>
                <DataGrid
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                />
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogContent className={cn.modalWindow}>
                        <TextField
                            label="Название Продукта"
                            className={cn.ModalWindowInput}
                            value={(selectedRow?.title as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, title: e.target.value }));
                            }}
                        />
                        <TextField
                            label="Артикул"
                            className={cn.ModalWindowInput}
                            value={(selectedRow?.art as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, art: e.target.value }));
                            }}
                        />
                        <TextField
                            label="Короткое описание"
                            className={cn.ModalWindowInput}
                            value={(selectedRow?.shortDesc as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, shortDesc: e.target.value }));
                            }}
                        />
                        <TextField
                            label="Цена"
                            className={cn.ModalWindowInput}
                            value={(selectedRow?.price as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, price: e.target.value }));
                            }}
                        />
                        <TextField
                            label="Кол-во"
                            className={cn.ModalWindowInput}
                            value={(selectedRow?.quantity as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, quantity: e.target.value }));
                            }}
                        />
                        {selectedImage === undefined ? (
                            <img
                                src={selectedRow?.img as string}
                                height={280}
                                alt={selectedRow?.title as string}
                            />
                        ) : (
                            <img src={selectedImageUrl} height={280} alt="Выбранное изображение" />
                        )}
                        <label className={cn.FileInput}>
                            <input type="file" accept="image/webp" onChange={handleFileChange} />
                            <span className={cn.inputFileBtn}>Выберите файл</span>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Отмена</Button>
                        <Button onClick={useHandleSaveChanges} variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(ProductChange));
