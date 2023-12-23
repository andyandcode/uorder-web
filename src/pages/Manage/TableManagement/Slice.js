import { createAsyncThunk } from '@reduxjs/toolkit';
import { TableAdmin } from '../../../api/adminApi';

export const getListTableAdmin = createAsyncThunk('tableAdmin/list', async () => {
    const res = await TableAdmin.getList();
    return res;
});

export const createTableAdmin = createAsyncThunk('tableAdmin/create', async (params) => {
    const res = await TableAdmin.create(params);
    return res;
});

export const updateTableAdmin = createAsyncThunk('tableAdmin/update', async (params) => {
    const res = await TableAdmin.update(params);
    return res;
});

export const deleteTableAdmin = createAsyncThunk('tableAdmin/delete', async (params) => {
    const res = await TableAdmin.delete(params);
    return res;
});

export const undoDeleteTableAdmin = createAsyncThunk('tableAdmin/undoDelete', async (params) => {
    const res = await TableAdmin.undoDetele(params);
    return res;
});

export const updateTableStatusAdmin = createAsyncThunk('tableAdmin/updateStatus', async (params) => {
    const res = await TableAdmin.updateTableStatus(params);
    return res;
});
