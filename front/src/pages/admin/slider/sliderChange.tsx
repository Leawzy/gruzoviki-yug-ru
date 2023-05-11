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
import { useGetSliderHook } from '../../../hooks/useGetSliderHook';

export default function SliderChange() {
    const { slider } = useGetSliderHook();
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
        { field: 'title', headerName: 'Название', width: 550 },
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
        const formattedRows: GridRowsProp = slider.map(item => ({
            id: item.id,
            title: item.name,
            img: item.img,
        }));
        setRows(formattedRows);
    }, [slider]);

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
