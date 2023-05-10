import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowId,
    GridRowsProp,
    GridValidRowModel,
    ruRU,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import { adminFetch, setAuthToken } from '../../../axios/global';
import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useGetBrandHook } from '../../../hooks/useGetBrandHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

interface BrandIF {
    id: number;
    title: string;
    img: string;
}

function BrandChange() {
    const { brand } = useGetBrandHook();
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [selectedRow, setSelectedRow] = useState<GridValidRowModel | undefined>([]);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (id: GridRowId) => {
        const selectedRow = rows.find(row => row.id === id);
        setSelectedRow(selectedRow);
        setOpenModal(true);
    };

    const handleDeleteRow = (id: GridRowId) => {
        const selectedRow = rows.find(row => row.id === id);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSaveChanges = async () => {
        setAuthToken();
        try {
            // @ts-ignore
            const { id, title, img }: BrandIF = selectedRow || {};
            const data = {
                id,
                title,
                img,
            } as BrandIF;
            const res: Response = await adminFetch('/brand/change', {
                method: 'post',
                data,
            });
            if (res.status === 200) {
                handleCloseModal();
            }
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
                    handleDeleteRow(params.id);
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
                        <img src={selectedRow?.img as string} alt={selectedRow?.title as string} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Отмена</Button>
                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(BrandChange));
