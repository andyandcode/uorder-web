import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { NotificationTarget, UseNotification, UserAction } from '../../../components/UseNotification';
import DishData from '../../../database/dish.json';
import MenuData from '../../../database/menu.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;
    const columns = TableColumns.MenuColumns(t);
    const data = MenuData;
    const [tableData, setTableData] = useState([]);
    const dishData = DishData;
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
            setTableData(data);
            setLoadingTable(false);
        }, 500);
    }, [data]);

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
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Menu), {
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOffClick = (data) => {
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Menu), {
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOnClick = (data) => {
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Menu), {
            onOk() {},
            onCancel() {},
        });
    };

    const handleQuickDeleteConfirm = (data) => {};

    const handleQuickTurnOffConfirm = (data) => {};

    const handleQuickActionButtonTurnOnClick = (data) => {};

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                console.log('Created: ', values);
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        UseNotification.Message.FinishMessage(t, UserAction.CreateFinish);
                        setOpenCreateModel(false);
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
                console.log('Edited: ', values);
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                        setOpenEditModel(false);
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
        dishData,
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
