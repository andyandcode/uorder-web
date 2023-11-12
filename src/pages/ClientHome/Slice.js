import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuClient } from '../../api/clientApi';

export const getListAvailable = createAsyncThunk('menu/list', async () => {
    const res = await MenuClient.getListAvailable();
    return res;
});
