import axios from 'axios';
import queryString from 'query-string';
import { redirect } from 'react-router-dom';
import Config from '../configuration/index';
import { rootKeys } from '../configuration/routesConfig';
import Utils from '../utilities';

const CreateAxiosInstance = () => {
    const instance = axios.create({
        baseURL: Config.endPointAdmin,
        headers: {
            'Content-type': 'multipart/form-data',
        },
        timeout: 10000,
        paramsSerializer: (params) => {
            queryString.stringify(params);
        },
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
                return;
            }

            if (error.response && error.response.status === 401) {
                redirect(rootKeys.loginUrl);
                return;
            }
            return error;
        },
    );

    return instance;
};

export const axiosInstance = CreateAxiosInstance();
