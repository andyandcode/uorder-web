import axiosClient from './axiosClient';

const MenuClient = {
    getListAvailable: (params) => {
        const url = '/menu/getAllAvailable';
        return axiosClient.get(url, { params });
    },
};

export { MenuClient };
