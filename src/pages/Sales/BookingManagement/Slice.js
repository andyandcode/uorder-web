import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingAdmin } from '../../../api/adminApi';

export const getListBookingAdmin = createAsyncThunk('bookingAdmin/list', async () => {
    const res = await BookingAdmin.getAll();
    return res;
});
export const getListCurrentBookingAdmin = createAsyncThunk('bookingAdmin/listCurrent', async () => {
    const res = await BookingAdmin.getCurrentBooking();
    return res;
});

export const updateBookingStatusAdmin = createAsyncThunk('bookingAdmin/updateStatus', async (params) => {
    const res = await BookingAdmin.updateBookingStatus(params);
    return res;
});
