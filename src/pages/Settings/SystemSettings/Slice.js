import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SystemSettingsAdmin } from '../../../api/adminApi';
import Config from '../../../configuration';

const initialSystemSettingsAdminList = () => {
    if (sessionStorage.getItem(Config.storageKey.systemSettingsAdmin)) {
        return {
            ...JSON.parse(sessionStorage.getItem(Config.storageKey.systemSettingsAdmin)),
        };
    }
    return {
        systemSettingsAdminList: [],
    };
};

export const getSystemSettingsAdmin = createAsyncThunk('systemSettingsAdmin/listSystemSettingsAdmin', async () => {
    const res = await SystemSettingsAdmin.getSettings();
    return res;
});

export const updateSystemSettingsAdmin = createAsyncThunk(
    'systemSettingsAdmin/updateSystemSettingsAdmin',
    async (params) => {
        const res = await SystemSettingsAdmin.updateSystemSettings(params);
        return res;
    },
);

const systemSettingsAdmin = createSlice({
    name: 'systemSettingsAdmin',
    initialState: initialSystemSettingsAdminList(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSystemSettingsAdmin.fulfilled, (state, action) => {
                state.systemSettingsAdminList = action.data;
            })
            .addCase(getSystemSettingsAdmin.rejected, (state, action) => {});
    },
});

const { reducer } = systemSettingsAdmin;
export default reducer;
