import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient } from '../../api/clientApi';

export const bookingClient = createAsyncThunk('booking/create', async (params) => {
    const res = await BookingClient.create(params);
    return res;
});
