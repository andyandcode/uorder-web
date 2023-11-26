import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient } from '../../api/clientApi';

export const updateBookingStatusClient = createAsyncThunk('bookingClient/updateBookingStatus', async (params) => {
    const res = await BookingClient.updateBookingStatus(params);
    return res;
});
