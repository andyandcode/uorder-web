import { Form, message, Modal, QRCode } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { NotificationTarget, UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { createTableAdmin, deleteTableAdmin, getListTableAdmin, updateTableAdmin } from './Slice';
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
    const [loadingTable, setLoadingTable] = useState(false);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListTableAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
            setLoadingTable(false);
        }, 500);
    }, [dispatch]);

    const getNewTableData = () => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListTableAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
            setLoadingTable(false);
        }, 500);
    };

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
        function onOk() {
            dispatch(deleteTableAdmin(data.id));
            getNewTableData();
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Table, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        function onOk() {
            const modifiedItem = {
                ...data,
                isActive: false,
            };
            dispatch(updateTableAdmin(modifiedItem));
            getNewTableData();
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Table, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        function onOk() {
            const modifiedItem = {
                ...data,
                isActive: true,
            };
            dispatch(updateTableAdmin(modifiedItem));
            getNewTableData();
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
                    .then(() => {
                        dispatch(createTableAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.CreateFinish);
                        setOpenCreateModel(false);
                        getNewTableData();
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.CreateFinishFail);
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
                            UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
                            setOpenEditModel(false);
                        } else {
                            UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                            setOpenEditModel(false);
                            getNewTableData();
                        }
                    })
                    .then(() => editForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
            });
    };

    const handleCreateNewClick = () => {
        setOpenCreateModel(true);
    };

    const handleRefreshClick = (index) => {
        setLoadingsRefreshButton((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            setLoadingTable(true);
            return newLoadings;
        });
        setTimeout(() => {
            setLoadingsRefreshButton((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                dispatch(getListTableAdmin()).then((result) => {
                    setTableData(Utils.getValues(result, 'payload', []));
                });
                setLoadingTable(false);
                return newLoadings;
            });
        }, 1000);
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
        loadingTable,
        loadingsRefreshButton,
        handleShowQrCodeClick,
        handleCreateNewClick,
        handleRefreshClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
