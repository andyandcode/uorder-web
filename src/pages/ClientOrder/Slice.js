import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient, DiscountCodeClient } from '../../api/clientApi';

export const bookingClient = createAsyncThunk('booking/create', async (params) => {
    const res = await BookingClient.create(params);
    return res;
});
export const getAvailableCodesClient = createAsyncThunk('discount/get', async (params) => {
    const res = await DiscountCodeClient.getAvailableCodes(params);
    return res;
});
export const applyDiscountCodeClient = createAsyncThunk('discount/apply', async (params) => {
    const res = await DiscountCodeClient.applyDiscountCode(params);
    return res;
});
