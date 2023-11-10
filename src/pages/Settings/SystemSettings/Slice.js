import { createAsyncThunk } from '@reduxjs/toolkit';
import { SystemSettingsAdmin } from '../../../api/adminApi';

export const getSystemSettingsAdmin = createAsyncThunk('systemSettingsAdmin/list', async () => {
    const res = await SystemSettingsAdmin.getSettings();
    return res;
});

export const updateSystemSettingsAdmin = createAsyncThunk('systemSettingsAdmin/update', async (params) => {
    const res = await SystemSettingsAdmin.update(params);
    return res;
});
