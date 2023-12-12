import { Form, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import TableColumns from '../../components/CustomTable/columnConfigs';
import { hideLoading, showLoading } from '../../components/FullPageLoading/LoadingSlice';
import { NotificationTarget, UseNotification } from '../../components/UseNotification';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import {
    createAccountAdmin,
    deleteAccountAdmin,
    getListAccountAdmin,
    undoDeleteAccountAdmin,
    updateAccountAdmin,
    updateAccountStatusAdmin,
} from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.AccountColumns(t);
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
            await dispatch(getListAccountAdmin()).then((result) => {
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

    const handleUndoDeleteClick = async () => {
        await dispatch(undoDeleteAccountAdmin(deleteAlert.data.id))
            .then(() => {
                setDeleteAlert({});
            })
            .then(() => fetchData());
    };

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };

    const handleActionButtonEditClick = (data) => {
        editForm.setFieldsValue({ ...data });
        setOpenEditModel(true);
    };

    const handleActionButtonDeleteClick = (data) => {
        async function onOk() {
            await dispatch(deleteAccountAdmin(data.id))
                .then((result) => {
                    const timestamp = Utils.getValues(result, 'payload', []);
                    setDeleteAlert({ data: data, timestamp: timestamp });
                })
                .then(() => {
                    fetchData();
                });
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        async function onOk() {
            await dispatch(
                updateAccountStatusAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: false,
                        id: data.id,
                    },
                ]),
            ).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        async function onOk() {
            await dispatch(
                updateAccountStatusAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: true,
                        id: data.id,
                    },
                ]),
            ).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Account, onOk));
    };

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        await dispatch(createAccountAdmin(values)).then((result) => {
                            const status = Utils.getValues(result, 'payload.response.status', null);
                            switch (status) {
                                case 490:
                                    messageApi.open(UseNotification.Message.UsernameExists(t));
                                    break;

                                default:
                                    UseNotification.Message.CreateFinish(t);
                                    setOpenCreateModel(false);
                                    fetchData();
                                    break;
                            }
                        });
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.CreateFinishFail(t);
            });
    };

    const handleEditSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        await dispatch(updateAccountAdmin(values)).then(() => {
                            UseNotification.Message.UpdateFinish(t);
                            setOpenEditModel(false);
                            fetchData();
                        });
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
        handleCreateNewClick,
        handleRefreshClick,
        deleteAlert,
        handleUndoDeleteClick,
        setDeleteAlert,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
