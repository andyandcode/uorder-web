import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient, MenuClient } from '../../api/clientApi';

export const getListAvailable = createAsyncThunk('menu/list', async () => {
    const res = await MenuClient.getListAvailable();
    return res;
});

export const getBooking = createAsyncThunk('booking/start', async (params) => {
    const res = await BookingClient.getBooking(params);
    return res;
});
