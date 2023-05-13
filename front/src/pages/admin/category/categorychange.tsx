import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { FormEvent, useEffect, useState } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetCategoryHook } from '../../../hooks/admin/useGetCategoryHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

function CategoryChange() {
    const { category } = useGetCategoryHook();
    const [formData, setFormData] = useState({});
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

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    const useHandleSaveChanges = async () => {
        try {
            await useSendChangeHook(
                '/category/change',
                {
                    id: selectedRow?.id as string,
                    title: selectedRow?.title as string,
                    property: formData,
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
                    handleDeleteRow(params.id, 'category/delete');
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
        const formattedRows: GridRowsProp = category.map(item => ({
            id: item.id,
            title: item.title,
        }));
        setRows(formattedRows);
    }, [category]);

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
                            label="Название Категории"
                            value={(selectedRow?.title as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, title: e.target.value }));
                            }}
                        />
                        {category[Number(selectedRow?.id) - 1]?.property && (
                            <form>
                                {Object.entries(category[Number(selectedRow?.id) - 1].property).map(
                                    ([key, label]) => (
                                        <input
                                            key={key}
                                            name={key}
                                            placeholder={label}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    )
                                )}
                            </form>
                        )}
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

export default withAuth(withAuthAdmin(CategoryChange));
