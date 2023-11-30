import axios from 'axios';
import queryString from 'query-string';
import { redirect } from 'react-router-dom';
import history from '../components/GlobalRouter';
import Config from '../configuration/index';
import { rootKeys } from '../configuration/routesConfig';
import Utils from '../utilities';

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
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
            return 'ERR_NETWORK';
        }
        if (error.response.status === 401) {
            history.push(rootKeys.loginUrl);
            return;
        }
        return error;
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
        if (error.code === 'ERR_NETWORK') {
            return 'ERR_NETWORK';
        }

        if (error.response.status === 401) {
            redirect(rootKeys.loginUrl);
            return;
        }
        return error;
    },
);

const CreateAxiosInstance = () => {
    const instance = axios.create({
        baseURL: Config.endPointAdmin,
        headers: {
            'content-type': 'application/json-patch+json',
        },
        timeout: 10000,
        paramsSerializer: (params) => queryString.stringify(params),
    });

    instance.interceptors.request.use(async (config) => {
        const jwt = Utils.getAccessToken();
        if (jwt.key) {
            config.headers.Authorization = `Bearer ${jwt.key}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }

            return response;
        },
        (error) => {
            if (error.code === 'ERR_NETWORK') {
                try {
                } catch (error) {}
                return;
            }

            if (error.response && error.response.status === 401) {
                history(rootKeys.loginUrl);
                return;
            }
            return error;
        },
    );

    return instance;
};

export const axiosInstance = CreateAxiosInstance();
