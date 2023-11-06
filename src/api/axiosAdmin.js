import axios from 'axios';
import queryString from 'query-string';
import Config from '../configuration/index';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: Config.endPointAdmin,
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
