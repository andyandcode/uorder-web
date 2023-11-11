import { axiosClient, axiosClientJson } from './axiosAdmin';

const FileUpload = {
    uploadFile: (params) => {
        const url = '/file/upload';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteFile: (params) => {
        const url = `/file/delete/${params}`;
        return axiosClient.delete(url);
    },
};

const DishAdmin = {
    getList: (params) => {
        const url = '/dish/getAll';
        return axiosClient.get(url, { params });
    },
    getListAvailable: (params) => {
        const url = '/dish/getAllAvailable';
        return axiosClient.get(url, { params });
    },
    create: (params) => {
        const url = '/dish/post';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/dish/put/${params.id}`;
        return axiosClient.put(url, params);
    },
    delete: (params) => {
        const url = `/dish/delete/${params}`;
        return axiosClient.delete(url);
    },
};

const TableAdmin = {
    getList: (params) => {
        const url = '/table/getAll';
        return axiosClient.get(url, { params });
    },
    create: (params) => {
        const url = '/table/post';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/table/put/${params.id}`;
        return axiosClient.put(url, params);
    },
    delete: (params) => {
        const url = `/table/delete/${params}`;
        return axiosClient.delete(url);
    },
};

const MenuAdmin = {
    getList: (params) => {
        const url = '/menu/getAll';
        return axiosClient.get(url, { params });
    },
    create: (params) => {
        const url = '/menu/post';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/menu/put/${params.id}`;
        return axiosClient.put(url, params);
    },
    delete: (params) => {
        const url = `/menu/delete/${params}`;
        return axiosClient.delete(url);
    },
};

const SystemSettingsAdmin = {
    getSettings: (params) => {
        const url = '/systemSettings/getSettings';
        return axiosClient.get(url, { params });
    },
    update: (params) => {
        const url = `/systemSettings/put/${params.id}`;
        return axiosClient.put(url, params);
    },
};

const OrderAdmin = {
    getAll: (params) => {
        const url = '/order/getAll';
        return axiosClient.get(url, { params });
    },
    create: (params) => {
        const url = '/order/post';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/order/put/${params.id}`;
        return axiosClient.put(url, params);
    },
    updateOrderStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/order/patch/${params[0].id}`;
        return axiosClientJson.patch(url, modifiedArray);
    },
};

export { DishAdmin, FileUpload, MenuAdmin, OrderAdmin, SystemSettingsAdmin, TableAdmin };
