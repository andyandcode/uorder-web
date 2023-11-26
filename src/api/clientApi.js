import { axiosAdminJson } from './axiosAdmin';
import axiosClient from './axiosClient';

const MenuClient = {
    getListAvailable: (params) => {
        const url = '/menu/getAllAvailable';
        return axiosClient.get(url, { params });
    },
};

const BookingClient = {
    getBooking: (params) => {
        const url = `/booking/${params}`;
        return axiosClient.get(url, { params });
    },
    getTracking: (params) => {
        const url = `/booking/tracker/${params}`;
        return axiosClient.get(url, { params });
    },
    create: (params) => {
        const url = '/booking/post';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
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

export { BookingClient, MenuClient };
