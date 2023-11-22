import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccountAdmin, AuthAdmin } from '../../../api/adminApi';

export const getAccountSettingsAdmin = createAsyncThunk('accountSettings/settings', async (params) => {
    const res = await AccountAdmin.getById(params);
    return res;
});

export const updateAccountSettingsAdmin = createAsyncThunk('accountSettings/update', async (params) => {
    const res = await AccountAdmin.update(params);
    return res;
});

export const resetPasswordAdmin = createAsyncThunk('resetPassword/update', async (params) => {
    const res = await AuthAdmin.resetPassword(params);
    return res;
});
