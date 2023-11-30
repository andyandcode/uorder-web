import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { NotificationTarget, UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import { deleteDishAdmin, updateDishAdmin } from '../DishManagement/Slice';
import propsProvider from './PropsProvider';
import { createMenuAdmin, deleteMenuAdmin, getListMenuAdmin, updateMenuAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.MenuColumns(t);
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(true);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);

    const fetchData = async () => {
        try {
            await dispatch(getListMenuAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTable(false);
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

    const handleActionButtonDeleteClick = (data) => {
        function onOk() {
            dispatch(deleteMenuAdmin(data.id)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Menu, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        function onOk() {
            const modifiedItem = {
                ...data,
                isActive: false,
                dishes: data.dishes.map((item) => item.id),
            };
            dispatch(updateMenuAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Menu, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        function onOk() {
            const modifiedItem = {
                ...data,
                isActive: true,
                dishes: data.dishes.map((item) => item.id),
            };
            dispatch(updateMenuAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Menu, onOk));
    };

    const handleQuickDeleteConfirm = (data) => {
        dispatch(deleteDishAdmin(data.id)).then(fetchData());
    };

    const handleQuickTurnOffConfirm = (data) => {
        const modifiedItem = {
            ...data,
            isActive: false,
        };
        dispatch(updateDishAdmin(modifiedItem)).then(() => fetchData());
    };

    const handleQuickActionButtonTurnOnClick = (data) => {
        const modifiedItem = {
            ...data,
            isActive: true,
        };
        dispatch(updateDishAdmin(modifiedItem)).then(() => fetchData());
    };

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        dispatch(createMenuAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.CreateFinish);
                        setOpenCreateModel(false);
                        fetchData();
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.CreateFinishFail);
            });
    };

    const handleEditSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        const result = await dispatch(updateMenuAdmin(values));
                        const status = Utils.getValues(result, 'error.code', []);
                        console.log(result);
                        console.log(status);

                        if (status === 'ERR_BAD_REQUEST') {
                            UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
                            setOpenEditModel(false);
                        } else {
                            UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                            setOpenEditModel(false);
                            fetchData();
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
        loadingTable,
        loadingsRefreshButton,
        handleCreateNewClick,
        handleRefreshClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
