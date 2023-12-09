import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient } from '../../api/clientApi';

export const getTracking = createAsyncThunk('booking/tracker', async (params) => {
    const res = await BookingClient.getTracking(params);
    return res;
});

export const payBookingClient = createAsyncThunk('booking/payBooking', async (params) => {
    const res = await BookingClient.payBooking(params);
    return res;
});
