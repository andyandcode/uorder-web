import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsAdmin } from '../../../api/adminApi';

export const getRevenue = createAsyncThunk('analytics/revenue', async () => {
    const res = await AnalyticsAdmin.getRevenue();
    return res;
});
export const getTopSellers = createAsyncThunk('analytics/topSellers', async () => {
    const res = await AnalyticsAdmin.getTopSellers();
    return res;
});
export const getCountManagement = createAsyncThunk('analytics/countManagement', async () => {
    const res = await AnalyticsAdmin.getCountManagement();
    return res;
});
