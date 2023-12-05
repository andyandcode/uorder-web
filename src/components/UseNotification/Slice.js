import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        content: null,
    },
    reducers: {
        showModal: (state, action) => {
            state.content = action.payload;
        },
    },
});
export const { showModal } = notificationSlice.actions;
export default notificationSlice.reducer;
