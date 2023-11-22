import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderAdmin } from '../../../api/adminApi';

export const getListOrderAdmin = createAsyncThunk('orderAdmin/list', async () => {
    const res = await OrderAdmin.getAll();
    return res;
});

export const createOrderAdmin = createAsyncThunk('orderAdmin/create', async (params) => {
    const res = await OrderAdmin.create(params);
    return res;
});

export const updateOrderAdmin = createAsyncThunk('orderAdmin/update', async (params) => {
    const res = await OrderAdmin.update(params);
    return res;
});

export const updateOrderStatusAdmin = createAsyncThunk('orderAdmin/updateOrderStatus', async (params) => {
    const res = await OrderAdmin.updateOrderStatus(params);
    return res;
});
