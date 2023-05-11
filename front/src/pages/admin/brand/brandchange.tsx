import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useHandleFileChangeHook } from '../../../hooks/admin/handlers/useHandleFileChangeHook';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetBrandHook } from '../../../hooks/admin/useGetBrandHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

function BrandChange() {
    const { brand } = useGetBrandHook();
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
            await useSendChangeHook(
                '/brand/change',
                {
                    id: selectedRow?.id as string,
                    title: selectedRow?.title as string,
                    file: selectedImage,
                },
                'post'
            );
            handleCloseModal();
        } catch (e) {
            console.error(e);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', width: 20 },
        { field: 'title', headerName: 'Название', width: 250 },
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
                    handleDeleteRow(params.id, 'brand/delete');
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
        const formattedRows: GridRowsProp = brand.map(item => ({
            id: item.id,
            title: item.title,
            img: item.img,
        }));
        setRows(formattedRows);
    }, [brand]);

    return (
        <AdminLayout>
            <div style={{ height: 900, width: '100%' }}>
                <DataGrid
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                />
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogContent>
                        <TextField
                            label="Название бренда"
                            value={(selectedRow?.title as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, title: e.target.value }));
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
                        <input type="file" accept="image/webp" onChange={handleFileChange} />
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

export default withAuth(withAuthAdmin(BrandChange));