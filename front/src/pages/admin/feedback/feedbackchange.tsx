import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetFeedBackHook } from '../../../hooks/admin/useGetFeedBackHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function FeedBackChange() {
    const { feedBack } = useGetFeedBackHook();
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
                '/feedback/change',
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
            headerName: 'Номер обращения',
            width: 200,
        },
        { field: 'email', headerName: 'E-mail', width: 250 },
        { field: 'name', headerName: 'Имя', width: 250 },
        { field: 'message', headerName: 'Сообщение', width: 250 },
        { field: 'status', headerName: 'Сообщение', width: 120 },
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
        const formattedRows: GridRowsProp = feedBack.map(item => ({
            id: item.id,
            email: item.email,
            name: item.name,
            message: item.message,
            status: item.status,
        }));
        setRows(formattedRows);
    }, [feedBack]);

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
                            <option value="Открыт">Открыт</option>
                            <option value="Закрыт">Закрыт</option>
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

export default withAuth(withAuthAdmin(FeedBackChange));
