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

const CertificateAdmin = {
    getListCertificate: (params) => {
        const url = '/certificates/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    insertCertificate: (params) => {
        const url = '/certificates/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateCertificate: (params) => {
        const url = `/certificates/put/${params.id}`;
        return axiosClientAdmin.put(url, params.formData);
    },
    deleteCertificate: (params) => {
        const url = `/certificates/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const ArticleAdmin = {
    getListArticle: (params) => {
        const url = '/article/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    insertArticle: (params) => {
        const url = '/article/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateArticle: (params) => {
        const url = `/article/put/${params.id}`;
        return axiosClientAdmin.put(url, params.article);
    },
    deleteArticle: (params) => {
        const url = `/article/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const GinsengAdmin = {
    getListGinseng: (params) => {
        const url = '/ginseng/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    insertGinseng: (params) => {
        const url = '/ginseng/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateGinseng: (params) => {
        const url = `/ginseng/put/${params.id}`;
        return axiosClientAdmin.put(url, params.formData);
    },
    deleteGinseng: (params) => {
        const url = `/ginseng/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const ProductAdmin = {
    getListProduct: (params) => {
        const url = '/product/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    getProductById: (id) => {
        const url = `/product/getByID/${id}`;
        return axiosClientAdmin.get(url);
    },
    getUnit: () => {
        const url = 'unit/getAll';
        return axiosClientAdmin.get(url);
    },
    getQr: (code) => {
        const url = `product/getQR/${code}`;
        return axiosClientAdmin.get(url);
    },
    insertProduct: (params) => {
        const url = '/product/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateProduct: (params) => {
        const url = `/product/put/${params.id}`;
        return axiosClientAdmin.put(url, params.product);
    },
    deleteProduct: (params) => {
        const url = `/product/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const LocationAdmin = {
    getListLocation: (params) => {
        const url = '/location/getAll';
        return axiosClientAdmin.get(url, { params });
    },
    insertLocation: (params) => {
        const url = '/location/post';
        return axiosClientAdmin.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateLocation: (params) => {
        const url = `/location/put/${params.id}`;
        return axiosClientAdmin.put(url, params.payload);
    },
    deleteLocation: (params) => {
        const url = `/location/delete/${params}`;
        return axiosClientAdmin.delete(url);
    },
};

const AdminAuth = {
    login: (params) => {
        const url = '/user/login';
        return axiosClientAdmin
            .post(url, params, {
                headers: { 'Content-Type': 'application/json' },
            })
            .catch(function (error) {
                return error.response.status;
            });
    },
};

const ForgetPw = {
    submitMail: (params) => {
        const url = '/user/forgetPassword';
        return axiosClientAdmin
            .post(url, params, {
                headers: { 'Content-Type': 'application/json' },
            })
            .catch(function (error) {
                return error.response.status;
            });
    },
};

const CreateNewPw = {
    submitVerifyCode: (params) => {
        const url = '/user/createNewPassword';
        return axiosClientAdmin
            .post(url, params, {
                headers: { 'Content-Type': 'application/json' },
            })
            .catch(function (error) {
                return error.response.status;
            });
    },
    createNewPw: (params) => {
        const url = '/user/createNewPassword';
        return axiosClientAdmin
            .post(url, params, {
                headers: { 'Content-Type': 'application/json' },
            })
            .catch(function (error) {
                return error.response.status;
            });
    },
};

export {
    AdminAuth,
    ArticleAdmin,
    CertificateAdmin,
    CreateNewPw,
    FileUpload,
    ForgetPw,
    GinsengAdmin,
    LocationAdmin,
    ProductAdmin,
};
