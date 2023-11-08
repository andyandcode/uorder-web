import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuAdmin } from '../../../api/adminApi';
import Config from '../../../configuration';

const initialMenuAdminList = () => {
    if (sessionStorage.getItem(Config.storageKey.menuAdmin)) {
        return {
            ...JSON.parse(sessionStorage.getItem(Config.storageKey.menuAdmin)),
        };
    }
    return {
        menuAdminList: [],
    };
};

export const getListMenuAdmin = createAsyncThunk('menuAdmin/listMenuAdmin', async () => {
    const res = await MenuAdmin.getListMenu();
    return res;
});

export const insertMenuAdmin = createAsyncThunk('menuAdmin/insertMenuAdmin', async (params) => {
    console.log(params);
    const res = await MenuAdmin.insertMenu(params);
    console.log(res);
    return res;
});

export const updateMenuAdmin = createAsyncThunk('menuAdmin/updateMenuAdmin', async (params) => {
    const res = await MenuAdmin.updateMenu(params);
    return res;
});

export const deleteMenuAdmin = createAsyncThunk('menuAdmin/deleteMenuAdmin', async (params) => {
    const res = await MenuAdmin.deleteMenu(params);
    return res;
});

const menuAdmin = createSlice({
    name: 'menuAdmin',
    initialState: initialMenuAdminList(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListMenuAdmin.fulfilled, (state, action) => {
                console.log(action);
                state.menuAdminList = action.data;
            })
            .addCase(getListMenuAdmin.rejected, (state, action) => {});
    },
});

const { reducer } = menuAdmin;
export default reducer;
