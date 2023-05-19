import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetRepairHook } from '../../../hooks/admin/useGetRepairHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';
import cn from '../style.module.scss';

function RepairChange() {
    const { repairList } = useGetRepairHook();
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
                '/repair/change',
                {
                    id: selectedRow?.id as string,
                    status: selectedRow?.status as string,
                    type: selectedRow?.type as string,
                    date: selectedRow?.date as string,
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
        {
            field: 'type',
            headerName: 'Описание проблемы',
            width: 200,
        },
        {
            field: 'model',
            headerName: 'Модель автомобиля',
            width: 200,
        },
        { field: 'status', headerName: 'Статус', width: 250 },
        { field: 'date', headerName: 'Время записи', width: 250 },
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
                    handleDeleteRow(params.id, 'post/delete');
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
        const formattedRows: GridRowsProp = repairList.map(item => ({
            id: item.id,
            status: item.status,
            description: item.description,
            model: item.model,
            date: item.date,
            type: item.type,
        }));
        setRows(formattedRows);
    }, [repairList]);

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
                            <option value="В процессе">В процессе</option>
                            <option value="Завершен">Завершен</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Укажите тип проблемы"
                            onChange={e =>
                                setSelectedRow(prev => ({ ...prev, type: e.target.value }))
                            }
                        />
                        <input
                            type="date"
                            onChange={e =>
                                setSelectedRow(prev => ({ ...prev, date: e.target.value }))
                            }
                        />
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

export default withAuth(withAuthAdmin(RepairChange));
