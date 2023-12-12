import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccountAdmin } from '../../api/adminApi';

export const getListAccountAdmin = createAsyncThunk('accountAdmin/list', async () => {
    const res = await AccountAdmin.getAll();
    return res;
});
export const getListRolesAdmin = createAsyncThunk('accountAdmin/listRoles', async () => {
    const res = await AccountAdmin.getAllRoles();
    return res;
});

export const createAccountAdmin = createAsyncThunk('accountAdmin/create', async (params) => {
    const res = await AccountAdmin.create(params);
    return res;
});

export const updateAccountAdmin = createAsyncThunk('accountAdmin/update', async (params) => {
    const res = await AccountAdmin.update(params);
    return res;
});

export const deleteAccountAdmin = createAsyncThunk('accountAdmin/delete', async (params) => {
    const res = await AccountAdmin.delete(params);
    return res;
});

export const updateAccountStatusAdmin = createAsyncThunk('accountAdmin/updateStatus', async (params) => {
    const res = await AccountAdmin.updateStatus(params);
    return res;
});

export const undoDeleteAccountAdmin = createAsyncThunk('accountAdmin/undoDelete', async (params) => {
    const res = await AccountAdmin.undoDetele(params);
    return res;
});
