import { axiosAdmin, axiosAdminJson } from './axiosAdmin';

const FileUpload = {
    uploadFile: (params) => {
        const url = '/file/upload';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteFile: (params) => {
        const url = `/file/delete/${params}`;
        return axiosAdmin.delete(url);
    },
};

const DishAdmin = {
    getList: (params) => {
        const url = '/dish/getAll';
        return axiosAdmin.get(url, { params });
    },
    getListAvailable: (params) => {
        const url = '/dish/getAllAvailable';
        return axiosAdmin.get(url, { params });
    },
    create: (params) => {
        const url = '/dish/post';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/dish/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
    delete: (params) => {
        const url = `/dish/delete/${params}`;
        return axiosAdmin.delete(url);
    },
};

const TableAdmin = {
    getList: (params) => {
        const url = '/table/getAll';
        return axiosAdmin.get(url, { params });
    },
    create: (params) => {
        const url = '/table/post';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/table/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
    delete: (params) => {
        const url = `/table/delete/${params}`;
        return axiosAdmin.delete(url);
    },
};

const MenuAdmin = {
    getList: (params) => {
        const url = '/menu/getAll';
        return axiosAdmin.get(url, { params });
    },
    create: (params) => {
        const url = '/menu/post';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/menu/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
    delete: (params) => {
        const url = `/menu/delete/${params}`;
        return axiosAdmin.delete(url);
    },
};

const SystemSettingsAdmin = {
    getSettings: (params) => {
        const url = '/systemSettings/getSettings';
        return axiosAdmin.get(url, { params });
    },
    update: (params) => {
        const url = `/systemSettings/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
};

const OrderAdmin = {
    getAll: (params) => {
        const url = '/order/getAll';
        return axiosAdmin.get(url, { params });
    },
    create: (params) => {
        const url = '/order/post';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/order/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
    updateOrderStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/order/patch/${params[0].id}`;
        return axiosAdminJson.patch(url, modifiedArray);
    },
};

const BookingAdmin = {
    getAll: (params) => {
        const url = '/booking/getAll';
        return axiosAdmin.get(url, { params });
    },
    getCurrentBooking: (params) => {
        const url = '/booking/getCurrentBooking';
        return axiosAdmin.get(url, { params });
    },
    updateBookingStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/booking/patch/${params[0].id}`;
        return axiosAdminJson.patch(url, modifiedArray);
    },
};

const AnalyticsAdmin = {
    getRevenue: (params) => {
        const url = '/analytics/getRevenue';
        return axiosAdmin.get(url, { params });
    },
    getTopSellers: (params) => {
        const url = '/analytics/getTopSellers';
        return axiosAdmin.get(url, { params });
    },
    getCountManagement: (params) => {
        const url = '/analytics/countManagement';
        return axiosAdmin.get(url, { params });
    },
};

const AuthAdmin = {
    login: (params) => {
        const url = '/auth/login';
        return axiosAdminJson.post(url, params);
    },
    resetPassword: (params) => {
        const url = `/auth/resetPassword/${params.id}`;
        return axiosAdmin.put(url, params);
    },
};

const AccountAdmin = {
    getAll: (params) => {
        const url = '/account/getAll';
        return axiosAdmin.get(url, { params });
    },
    getById: (params) => {
        const url = `/account/getById/${params}`;
        return axiosAdminJson.get(url);
    },
    getAllRoles: (params) => {
        const url = '/account/getAllRoles';
        return axiosAdmin.get(url, { params });
    },
    create: (params) => {
        const url = '/account/post';
        return axiosAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (params) => {
        const url = `/account/put/${params.id}`;
        return axiosAdmin.put(url, params);
    },
    delete: (params) => {
        const url = `/account/delete/${params}`;
        return axiosAdmin.delete(url);
    },
    updateStatus: (params) => {
        console.log(params);
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/account/patch/${params[0].id}`;
        return axiosAdminJson.patch(url, modifiedArray);
    },
};

export {
    AccountAdmin,
    AnalyticsAdmin,
    AuthAdmin,
    BookingAdmin,
    DishAdmin,
    FileUpload,
    MenuAdmin,
    OrderAdmin,
    SystemSettingsAdmin,
    TableAdmin,
};
