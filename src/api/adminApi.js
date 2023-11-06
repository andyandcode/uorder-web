import axiosClientAdmin from './axiosAdmin';

const FileUpload = {
    uploadFile: (params) => {
        const url = '/file/upload';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteFile: (params) => {
        const url = `/file/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const DishAdmin = {
    getListDish: (params) => {
        const url = '/dish/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    insertDish: (params) => {
        const url = '/dish/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateDish: (params) => {
        const url = `/dish/put/${params.id}`;
        return axiosClientAdmin.put(url, params.formData);
    },
    deleteDish: (params) => {
        const url = `/dish/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

export { DishAdmin, FileUpload };
