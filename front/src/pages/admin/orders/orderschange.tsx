import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetOrderHook } from '../../../hooks/admin/useGetOrderHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function OrdersChange() {
    const { order } = useGetOrderHook();
    const {
        rows,
        setRows,
        selectedRow,
        setSelectedRow,
        openModal,
        handleOpenModal,
        handleCloseModal,
    } = useModalHandlerHook([]);

    const useHandleSaveChanges = async () => {
        try {
            await useSendChangeHook(
                '/order/change',
                {
                    id: selectedRow?.id as string,
                    status: selectedRow?.status as string,
                },
                'patch'
            );
            handleCloseModal();
        } catch (e) {
            console.error(e);
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Номер заказа',
            width: 200,
        },
        { field: 'status', headerName: 'Название', width: 250 },
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

                return <Button onClick={handleEdit}>Изменить</Button>;
            },
        },
    ];

    useEffect(() => {
        const formattedRows: GridRowsProp = order.map(item => ({
            id: item.id,
            status: item.status,
        }));
        setRows(formattedRows);
    }, [order]);

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
                        <select
                            onChange={e =>
                                setSelectedRow(prev => ({ ...prev, status: e.target.value }))
                            }
                        >
                            <option value="В обработке">В обработке</option>
                            <option value="Сборка заказа">Сборка заказа</option>
                            <option value="Ожидает">Ожидает</option>
                            <option value="Выдан">Выдан</option>
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ textAlign: 'left' }} onClick={handleCloseModal}>
                            Отмена
                        </Button>
                        <Button onClick={useHandleSaveChanges} variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(OrdersChange));
