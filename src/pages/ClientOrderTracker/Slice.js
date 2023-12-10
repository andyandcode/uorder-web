import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionClient, BookingClient } from '../../api/clientApi';

export const getTracking = createAsyncThunk('booking/tracker', async (params) => {
    const res = await BookingClient.getTracking(params);
    return res;
});

export const payBookingClient = createAsyncThunk('booking/payBooking', async (params) => {
    const res = await BookingClient.payBooking(params);
    return res;
});

export const callStaffClient = createAsyncThunk('booking/callStaff', async (params) => {
    const res = await ActionClient.callStaff(params);
    return res;
});
