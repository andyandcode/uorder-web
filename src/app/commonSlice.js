import { createSlice } from '@reduxjs/toolkit';
import Config from '../configuration';

const initialCommon = () => {
    if (sessionStorage.getItem(Config.storageKey.common)) {
        return {
            ...JSON.parse(sessionStorage.getItem(Config.storageKey.common)),
        };
    }
    return {
        lang: 'vi',
    };
};

const common = createSlice({
    name: 'common',
    initialState: initialCommon(),
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload;
            sessionStorage.setItem(Config.storageKey.common, JSON.stringify(state));
        },
    },
});

const { reducer, actions } = common;
export const { setLang } = actions;
export default reducer;
