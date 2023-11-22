import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAdmin } from '../../../api/adminApi';

export const login = createAsyncThunk('auth/login', async (params) => {
    const res = await AuthAdmin.login(params);
    return res;
});
