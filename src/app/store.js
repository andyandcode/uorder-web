import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../components/FullPageLoading/LoadingSlice';
import notificationReducer from '../components/UseNotification/Slice';
import { setModalDispatchRef } from '../components/UseNotification/modalDispatchRef';
import commonReducer from './commonSlice';

const rootReducer = {
    common: commonReducer,
    loading: loadingReducer,
    notification: notificationReducer,
};
const store = configureStore({ reducer: rootReducer });
setModalDispatchRef(store.dispatch);
export default store;
