import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuAdmin } from '../../../api/adminApi';

export const getListMenuAdmin = createAsyncThunk('menuAdmin/list', async () => {
    const res = await MenuAdmin.getList();
    return res;
});

export const createMenuAdmin = createAsyncThunk('menuAdmin/create', async (params) => {
    const res = await MenuAdmin.create(params);
    return res;
});

export const updateMenuAdmin = createAsyncThunk('menuAdmin/update', async (params) => {
    const res = await MenuAdmin.update(params);
    return res;
});

export const deleteMenuAdmin = createAsyncThunk('menuAdmin/delete', async (params) => {
    const res = await MenuAdmin.delete(params);
    return res;
});
