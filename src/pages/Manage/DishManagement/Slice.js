import { createAsyncThunk } from '@reduxjs/toolkit';
import { DishAdmin } from '../../../api/adminApi';

export const getListDishAdmin = createAsyncThunk('dishAdmin/list', async () => {
    const res = await DishAdmin.getList();
    return res;
});
export const getListDishAvailableAdmin = createAsyncThunk('dishAdmin/listAvailable', async () => {
    const res = await DishAdmin.getListAvailable();
    return res;
});

export const createDishAdmin = createAsyncThunk('dishAdmin/create', async (params) => {
    const res = await DishAdmin.create(params);
    return res;
});

export const updateDishAdmin = createAsyncThunk('dishAdmin/update', async (params) => {
    const res = await DishAdmin.update(params);
    return res;
});

export const deleteDishAdmin = createAsyncThunk('dishAdmin/delete', async (params) => {
    const res = await DishAdmin.delete(params);
    return res;
});

export const undoDeleteDishAdmin = createAsyncThunk('dishAdmin/undoDelete', async (params) => {
    const res = await DishAdmin.undoDetele(params);
    return res;
});

export const updateDishStatusAdmin = createAsyncThunk('dishAdmin/updateStatus', async (params) => {
    const res = await DishAdmin.updateDishStatus(params);
    return res;
});
