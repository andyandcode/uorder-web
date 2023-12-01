import { axiosInstance } from './axiosAdmin';

const DishAdmin = {
    getList: (params) => {
        const url = '/dish/getAll';
        return axiosInstance.get(url, { params });
    },
    getListAvailable: (params) => {
        const url = '/dish/getAllAvailable';
        return axiosInstance.get(url, { params });
    },
    create: (params) => {
        const url = '/dish/post';
        return axiosInstance.post(url, params, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
    update: (params) => {
        const url = `/dish/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
    delete: (params) => {
        const url = `/dish/delete/${params}`;
        return axiosInstance.delete(url);
    },
};

const TableAdmin = {
    getList: (params) => {
        const url = '/table/getAll';
        return axiosInstance.get(url, { params });
    },
    create: (params) => {
        const url = '/table/post';
        return axiosInstance.post(url, params);
    },
    update: (params) => {
        const url = `/table/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
    delete: (params) => {
        const url = `/table/delete/${params}`;
        return axiosInstance.delete(url);
    },
};

const MenuAdmin = {
    getList: (params) => {
        const url = '/menu/getAll';
        return axiosInstance.get(url, { params });
    },
    create: (params) => {
        const url = '/menu/post';
        return axiosInstance.post(url, params);
    },
    update: (params) => {
        const url = `/menu/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
    delete: (params) => {
        const url = `/menu/delete/${params}`;
        return axiosInstance.delete(url);
    },
};

const SystemSettingsAdmin = {
    getSettings: (params) => {
        const url = '/systemSettings/getSettings';
        return axiosInstance.get(url, { params });
    },
    update: (params) => {
        const url = `/systemSettings/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
};

const OrderAdmin = {
    getAll: (params) => {
        const url = '/order/getAll';
        return axiosInstance.get(url, { params });
    },
    create: (params) => {
        const url = '/order/post';
        return axiosInstance.post(url, params);
    },
    update: (params) => {
        const url = `/order/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
    updateOrderStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/order/patch/${params[0].id}`;
        return axiosInstance.patch(url, modifiedArray, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
};

const BookingAdmin = {
    getAll: (params) => {
        const url = '/booking/getAll';
        return axiosInstance.get(url, { params });
    },
    getCurrentBooking: (params) => {
        const url = '/booking/getCurrentBooking';
        return axiosInstance.get(url, { params });
    },
    updateBookingStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/booking/patch/${params[0].id}`;
        return axiosInstance.patch(url, modifiedArray, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
};

const AnalyticsAdmin = {
    getRevenue: (params) => {
        const url = '/analytics/getRevenue';
        return axiosInstance.get(url, { params });
    },
    getTopSellers: (params) => {
        const url = '/analytics/getTopSellers';
        return axiosInstance.get(url, { params });
    },
    getCountManagement: (params) => {
        const url = '/analytics/countManagement';
        return axiosInstance.get(url, { params });
    },
};

const AuthAdmin = {
    login: (params) => {
        const url = '/auth/login';
        return axiosInstance.post(url, params, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
    resetPassword: (params) => {
        const url = `/auth/resetPassword/${params.id}`;
        return axiosInstance.put(url, params, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
};

const AccountAdmin = {
    getAll: (params) => {
        const url = '/account/getAll';
        return axiosInstance.get(url, { params });
    },
    getById: (params) => {
        const url = `/account/getById/${params}`;
        return axiosInstance.get(url);
    },
    getAllRoles: (params) => {
        const url = '/account/getAllRoles';
        return axiosInstance.get(url, { params });
    },
    create: (params) => {
        const url = '/account/post';
        return axiosInstance.post(url, params);
    },
    update: (params) => {
        const url = `/account/put/${params.id}`;
        return axiosInstance.put(url, params);
    },
    delete: (params) => {
        const url = `/account/delete/${params}`;
        return axiosInstance.delete(url);
    },
    updateStatus: (params) => {
        const modifiedArray = [];

        for (const item of params) {
            const { path, op, value } = item;
            const modifiedItem = { path, op, value };
            modifiedArray.push(modifiedItem);
        }
        const url = `/account/patch/${params[0].id}`;
        return axiosInstance.patch(url, modifiedArray, {
            headers: { 'content-type': 'application/json-patch+json' },
        });
    },
};

export {
    AccountAdmin,
    AnalyticsAdmin,
    AuthAdmin,
    BookingAdmin,
    DishAdmin,
    MenuAdmin,
    OrderAdmin,
    SystemSettingsAdmin,
    TableAdmin,
};
