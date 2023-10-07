import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './commonSlice';

const rootReducer = {
    common: commonReducer,
};
const store = configureStore({ reducer: rootReducer });
export default store;
