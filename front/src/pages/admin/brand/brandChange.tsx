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

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useAdminBrandData } from '../../../hooks/useAdminHook';

export default function BrandChange() {
    const { brand } = useAdminBrandData();
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [selectedRow, setSelectedRow] = useState<GridValidRowModel | undefined>([]);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (id: GridRowId) => {
        const selectedRow = rows.find(row => row.id === id);
        setSelectedRow(selectedRow);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSaveChanges = () => {
        handleCloseModal();
    };

    const columns: GridColDef[] = [
        { field: 'id' },
        { field: 'title', headerName: 'Название', width: 150 },
        {
            field: 'actions',
            headerName: 'Действие',
            width: 150,
            renderCell: params => {
                const handleEdit = () => {
                    handleOpenModal(params.id);
                };

                return <Button onClick={handleEdit}>Изменить</Button>;
            },
        },
    ];

    useEffect(() => {
        const formattedRows: GridRowsProp = brand.map(item => ({
            id: item.id,
            title: item.title,
        }));
        setRows(formattedRows);
    }, [brand]);

    return (
        <AdminLayout>
            <div style={{ height: 700, width: '100%' }}>
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
