import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, ruRU } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import AdminLayout from '../../../components/shared/layouts/AdminLayout';
import { useModalHandlerHook } from '../../../hooks/admin/handlers/useModalHandlerHook';
import { useSendChangeHook } from '../../../hooks/admin/handlers/useSendChangeHook';
import { useGetUserHook } from '../../../hooks/admin/useGetUserHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

function UserChange() {
    const { users } = useGetUserHook();
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
                '/slider/change',
                {
                    id: selectedRow?.id as string,
                    firstName: selectedRow?.firstName as string,
                    lastName: selectedRow?.lastName as string,
                    address: selectedRow?.address as string,
                    phoneNumber: selectedRow?.phoneNumber as number,
                    email: selectedRow?.email as string,
                    role: selectedRow?.role as string,
                },
                'patch'
            );
            handleCloseModal();
        } catch (e) {
            console.error(e);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id' },
        { field: 'firstName', headerName: 'Имя', width: 150 },
        { field: 'lastName', headerName: 'Фамилия', width: 150 },
        { field: 'address', headerName: 'Адрес', width: 150 },
        { field: 'phoneNumber', headerName: 'Номер телефона', width: 200 },
        { field: 'email', headerName: 'Почта', width: 300 },
        { field: 'role', headerName: 'Роль', width: 150 },
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
                    handleDeleteRow(params.id, 'user/delete');
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
        const formattedRows: GridRowsProp = users.map(item => ({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            address: item.address === null ? 'Не указан' : item.address,
            email: item.email,
            role: item.role,
            phoneNumber: item.phoneNumber === null ? 'Отсутствует' : `+${item.phoneNumber}`,
        }));
        setRows(formattedRows);
    }, [users]);

    return (
        <AdminLayout>
            <div style={{ height: 900, width: '100%' }}>
                <DataGrid
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                />
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            style={{ padding: '10px' }}
                            label="Имя"
                            value={(selectedRow?.firstName as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, firstName: e.target.value }));
                            }}
                        />
                        <TextField
                            style={{ padding: '10px' }}
                            label="Фамилия"
                            value={(selectedRow?.lastName as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, lastName: e.target.value }));
                            }}
                        />
                        <TextField
                            style={{ padding: '10px' }}
                            label="Номер телефона"
                            placeholder={selectedRow?.phoneNumber as string}
                            inputProps={{ maxLength: 11 }}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, phoneNumber: e.target.value }));
                            }}
                        />
                        <TextField
                            style={{ padding: '10px' }}
                            label="Адрес"
                            value={(selectedRow?.address as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, address: e.target.value }));
                            }}
                        />
                        <TextField
                            style={{ padding: '10px' }}
                            label="Почта"
                            value={(selectedRow?.email as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, email: e.target.value }));
                            }}
                        />
                        <TextField
                            style={{ padding: '10px' }}
                            label="Роль"
                            value={(selectedRow?.role as string) || ''}
                            onChange={e => {
                                setSelectedRow(prev => ({ ...prev, role: e.target.value }));
                            }}
                        />
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

export default withAuth(withAuthAdmin(UserChange));
