import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DishAdmin } from '../../../api/adminApi';
import Config from '../../../configuration';

const initialDishAdminList = () => {
    if (sessionStorage.getItem(Config.storageKey.dishAdmin)) {
        return {
            ...JSON.parse(sessionStorage.getItem(Config.storageKey.dishAdmin)),
        };
    }
    return {
        dishAdminList: [],
    };
};

export const getListDishAdmin = createAsyncThunk('dishAdmin/listDishAdmin', async () => {
    const res = await DishAdmin.getListDish();
    return res;
});

export const insertGinsengAdmin = createAsyncThunk('dishAdmin/insertDishAdmin', async (params) => {
    const res = await DishAdmin.insertDish(params);
    return res;
});

export const updateGinsengAdmin = createAsyncThunk('dishAdmin/updateDishAdmin', async (params) => {
    const res = await DishAdmin.updateDish(params);
    return res;
});

export const deleteGinsengAdmin = createAsyncThunk('dishAdmin/deleteDishAdmin', async (params) => {
    const res = await DishAdmin.deleteDish(params);
    return res;
});

const dishAdmin = createSlice({
    name: 'dishAdmin',
    initialState: initialDishAdminList(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListDishAdmin.fulfilled, (state, action) => {
                console.log(action);
                state.dishAdminList = action.data;
            })
            .addCase(getListDishAdmin.rejected, (state, action) => {});
    },
});

const { reducer } = dishAdmin;
export default reducer;
