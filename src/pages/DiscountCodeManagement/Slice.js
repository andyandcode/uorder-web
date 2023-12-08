import { createAsyncThunk } from '@reduxjs/toolkit';
import { DiscountCodeAdmin } from '../../api/adminApi';

export const getListDiscountCodeAdmin = createAsyncThunk('discountCodeAdmin/list', async () => {
    const res = await DiscountCodeAdmin.getList();
    return res;
});

export const createDiscountCodeAdmin = createAsyncThunk('discountCodeAdmin/create', async (params) => {
    const res = await DiscountCodeAdmin.create(params);
    return res;
});

export const deleteDiscountCodeAdmin = createAsyncThunk('discountCodeAdmin/delete', async (params) => {
    const res = await DiscountCodeAdmin.delete(params);
    return res;
});

export const updateDiscountCodeAdmin = createAsyncThunk('discountCodeAdmin/updatePatch', async (params) => {
    const res = await DiscountCodeAdmin.updateDiscountCode(params);
    return res;
});
