import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { NotificationTarget, UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { getListDishAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.DishColumns(t);
    const expandedRowRenderSelection = TableColumns.ExpandedRowRenderSelection;
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListDishAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
            setLoadingTable(false);
        }, 500);
    }, [dispatch]);

    const [defaultFileList, setDefaultFileList] = useState([]);

    const handleCreateNewClick = () => {
        setOpenCreateModel(true);
    };

    const handleEditCancelClick = () => {
        setOpenEditModel(false);
    };

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };

    const handleActionButtonEditClick = (data) => {
        setDefaultFileList(data.medias != null ? data.medias : []);
        editForm.setFieldsValue({ ...data });
        setOpenEditModel(true);
    };

    const handleActionButtonDeleteClick = (data) => {
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Dish), {
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOffClick = (data) => {
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Dish), {
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOnClick = (data) => {
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Dish), {
            onOk() {},
            onCancel() {},
        });
    };

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
        loadingTable,
        loadingsRefreshButton,
        defaultFileList,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        expandedRowRenderSelection,
        handleCreateNewClick,
        handleRefreshClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
