import { GridRowId, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { useState } from 'react';

import { adminFetch } from '../../../axios/global';

export const useModalHandlerHook = (initialRows: GridRowsProp) => {
    const [rows, setRows] = useState<GridRowsProp>(initialRows);
    const [selectedRow, setSelectedRow] = useState<GridValidRowModel | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (id: GridRowId) => {
        const selectedRow = rows.find(row => row.id === id);
        setSelectedRow(selectedRow || null);
        setOpenModal(true);
    };

    const handleDeleteRow = (id: GridRowId, url: string) => {
        const selectedRow = rows.find(row => row.id === id);
        async function deleteRow() {
            const res = await adminFetch(url, {
                method: 'delete',
                data: {
                    id: selectedRow.id as string,
                },
            });
            if (res.status === 200) {
                location.reload();
            }
        }
        deleteRow().catch(e => console.error(e));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return {
        rows,
        setRows,
        selectedRow,
        setSelectedRow,
        openModal,
        handleOpenModal,
        handleDeleteRow,
        handleCloseModal,
    };
};
