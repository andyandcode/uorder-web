import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../components/FullPageLoading/LoadingSlice';
import commonReducer from './commonSlice';

const rootReducer = {
    common: commonReducer,
    loading: loadingReducer,
};
const store = configureStore({ reducer: rootReducer });
export default store;
