import axios from 'axios';
import history from 'components/Redirect/useRedirect';
import Config from 'configuration';
import { pagePath } from 'configuration/routeConfig';
import queryString from 'query-string';
import Utils from 'utils';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: Config.endPointAdmin,
    headers: {
        'content-type': 'application/json',
    },
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const jwt = Utils.getAccessToken();
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
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
        if (error.response.status === 401) {
            history.push(pagePath.signInUrl);
        }
        throw error;
    },
);

export default axiosClient;
