import axios from 'axios';
import queryString from 'query-string';
import { redirect } from 'react-router-dom';
import history from '../components/GlobalRouter';
import Config from '../configuration/index';
import { rootKeys } from '../configuration/routesConfig';
import Utils from '../utilities';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
export const axiosAdmin = axios.create({
    baseURL: Config.endPointAdmin,
    headers: {
        'content-type': 'multipart/form-data',
    },
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params),
});

export const axiosAdminJson = axios.create({
    baseURL: Config.endPointAdmin,
    headers: {
        'content-type': 'application/json-patch+json',
    },
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosAdmin.interceptors.request.use(async (config) => {
    const jwt = Utils.getAccessToken();
    if (jwt.key) {
        config.headers.Authorization = `Bearer ${jwt.key}`;
    }
    return config;
});

axiosAdmin.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            history.push(rootKeys.loginUrl);
        }
        throw error;
    },
);

axiosAdminJson.interceptors.request.use(async (config) => {
    const jwt = Utils.getAccessToken();
    if (jwt.key) {
        config.headers.Authorization = `Bearer ${jwt.key}`;
    }
    return config;
});

axiosAdminJson.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            redirect(rootKeys.loginUrl);
        }
        return error;
    },
);
