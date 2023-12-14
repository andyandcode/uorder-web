import { Form, message, Modal, QRCode } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { NotificationTarget, UseNotification } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { createTableAdmin, deleteTableAdmin, getListTableAdmin, undoDeleteTableAdmin, updateTableAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.TablesColumns(t);
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [deleteAlert, setDeleteAlert] = useState({ data: null, timestamp: 0 });

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getListTableAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const handleEditCancelClick = () => {
        setOpenEditModel(false);
    };

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };

    const handleActionButtonEditClick = (data) => {
        editForm.setFieldsValue({ ...data });
        setOpenEditModel(true);
    };

    const handleUndoDeleteClick = async () => {
        await dispatch(undoDeleteTableAdmin(deleteAlert.data.id))
            .then(() => {
                setDeleteAlert({});
            })
            .then(() => fetchData());
    };

    const downloadQRCode = (name) => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = `${name}.png`;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleShowQrCodeClick = (data) => {
        Modal.confirm({
            title: t('main.notification.qr_code.title', { table: data.name }),
            okText: t('main.components.button.download'),
            cancelText: t('main.components.button.cancel'),
            width: '16%',
            content: (
                <div id='myqrcode'>
                    <QRCode
                        value={data.route}
                        bgColor='#fff'
                        style={{
                            marginBottom: 16,
                        }}
                    />
                </div>
            ),
            onOk() {
                downloadQRCode(data.name);
            },
            onCancel() {},
        });
    };

    const handleActionButtonDeleteClick = (data) => {
        async function onOk() {
            await dispatch(deleteTableAdmin(data.id))
                .then((result) => {
                    const timestamp = Utils.getValues(result, 'payload', []);
                    setDeleteAlert({ data: data, timestamp: timestamp });
                })
                .then(() => {
                    fetchData();
                });
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Table, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        async function onOk() {
            const modifiedItem = {
                ...data,
                isActive: false,
            };
            await dispatch(updateTableAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Table, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        async function onOk() {
            const modifiedItem = {
                ...data,
                isActive: true,
            };
            await dispatch(updateTableAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Table, onOk));
    };

    const handleQuickDeleteConfirm = (data) => {};

    const handleQuickTurnOffConfirm = (data) => {};

    const handleQuickActionButtonTurnOnClick = (data) => {};

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        await dispatch(createTableAdmin(values)).then(() => {
                            UseNotification.Message.CreateFinish(t);
                            setOpenCreateModel(false);
                            fetchData();
                        });
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.CreateFinishFail(t);
            });
    };

    const handleEditSubmitClick = async (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        const result = await dispatch(updateTableAdmin(values));
                        const status = Utils.getValues(result, 'error.code', []);

                        if (status === 'ERR_BAD_REQUEST') {
                            UseNotification.Message.UpdateFinishFail(t);
                            setOpenEditModel(false);
                        } else {
                            UseNotification.Message.UpdateFinish(t);
                            setOpenEditModel(false);
                            fetchData();
                        }
                    })
                    .then(() => editForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.UpdateFinishFail(t);
            });
    };

    const handleCreateNewClick = () => {
        setOpenCreateModel(true);
    };

    const handleRefreshClick = (index) => {
        fetchData();
    };

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        tableData,
        openCreateModel,
        openEditModel,
        createForm,
        editForm,
        messageContextHolder,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        handleQuickTurnOffConfirm,
        handleQuickDeleteConfirm,
        handleQuickActionButtonTurnOnClick,
        handleShowQrCodeClick,
        handleCreateNewClick,
        handleRefreshClick,
        deleteAlert,
        handleUndoDeleteClick,
        setDeleteAlert,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
