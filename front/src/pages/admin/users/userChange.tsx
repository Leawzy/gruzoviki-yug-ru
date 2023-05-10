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
import { useAdminUserData } from '../../../hooks/useAdminHook';
import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

interface UserDataIF {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

function UserChange() {
    const { users } = useAdminUserData();
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

    const handleSaveChanges = async () => {
        setAuthToken();
        try {
            // @ts-ignore
            const { id, firstName, lastName, email, phoneNumber, role }: UserDataIF =
                selectedRow || {};
            const data = {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                role,
            } as UserDataIF;
            const res: Response = await adminFetch('/user/change', {
                method: 'patch',
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
        { field: 'id' },
        { field: 'firstName', headerName: 'Имя', width: 150 },
        { field: 'lastName', headerName: 'Фамилия', width: 150 },
        { field: 'phoneNumber', headerName: 'Номер телефона', width: 200 },
        { field: 'email', headerName: 'Почта', width: 300 },
        { field: 'role', headerName: 'Роль', width: 150 },
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
        const formattedRows: GridRowsProp = users.map(item => ({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            role: item.role,
            phoneNumber: item.phoneNumber === null ? 'Отсутствует' : `+${item.phoneNumber}`,
        }));
        setRows(formattedRows);
    }, [users]);

    return (
        <AdminLayout>
            <div style={{ height: 700, width: '100%' }}>
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
                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AdminLayout>
    );
}

export default withAuth(withAuthAdmin(UserChange));
