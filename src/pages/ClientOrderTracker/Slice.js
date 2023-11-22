import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingClient } from '../../api/clientApi';

export const getTracking = createAsyncThunk('booking/tracker', async (params) => {
    const res = await BookingClient.getTracking(params);
    return res;
});
