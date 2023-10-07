import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productListAddress } from 'api/productApi';
import Config from 'configuration';

const initialAddressList = () => {
    if (sessionStorage.getItem(Config.storageKey.address)) {
        return {
            ...JSON.parse(sessionStorage.getItem(Config.storageKey.address)),
        };
    }
    return {
        addressList: [],
    };
};

export const getListAddressByProductId = createAsyncThunk('product/listAddress', async (params) => {
    const res = await productListAddress.getListAddress(params);
    return res;
});

const address = createSlice({
    name: 'address',
    initialState: initialAddressList(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListAddressByProductId.fulfilled, (state, action) => {
                state.addressList = action.payload.responseData;
                sessionStorage.setItem(Config.storageKey.address, JSON.stringify(state));
            })
            .addCase(getListAddressByProductId.rejected, (state, action) => {});
    },
});

const { reducer } = address;
export default reducer;
