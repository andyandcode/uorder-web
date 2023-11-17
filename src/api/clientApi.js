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
    letsBooking: (params) => {
        const url = `/booking/${params}`;
        return axiosClient.get(url, { params });
    },
};

export { BookingClient, MenuClient };
