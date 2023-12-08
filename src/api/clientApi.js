import { axiosInstance } from './axiosAdmin';
import axiosClient from './axiosClient';

const MenuClient = {
    getListAvailable: (params) => {
        const url = '/menu/getAllAvailable';
        return axiosClient.get(url, { params });
    },
};

const DiscountCodeClient = {
    getAvailableCodes: (params) => {
        const url = '/discount/getAvailableCodes';
        return axiosInstance.get(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    applyDiscountCode: (params) => {
        const url = '/discount/applyDiscountCode';
        return axiosInstance.get(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
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
        return axiosInstance.patch(url, modifiedArray, {
            headers: { 'Content-Type': 'application/json-patch+json' },
        });
    },
};

export { BookingClient, DiscountCodeClient, MenuClient };
