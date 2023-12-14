import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { NotificationTarget, UseNotification } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { createDishAdmin, deleteDishAdmin, getListDishAdmin, undoDeleteDishAdmin, updateDishAdmin } from './Slice';
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
    const [deleteAlert, setDeleteAlert] = useState({ data: null, timestamp: 0 });
    const [messageApi, messageContextHolder] = message.useMessage();
    const [defaultFile, setDefaultFile] = useState([]);

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getListDishAdmin()).then((result) => {
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
        setDefaultFile(data.coverLink != null ? data.coverLink : '');
        editForm.setFieldsValue({ ...data });
        setOpenEditModel(true);
    };

    const handleActionButtonDeleteClick = (data) => {
        async function onOk() {
            await dispatch(deleteDishAdmin(data.id))
                .then((result) => {
                    const timestamp = Utils.getValues(result, 'payload', []);
                    setDeleteAlert({ data: data, timestamp: timestamp });
                })
                .then(() => {
                    fetchData();
                });
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Dish, onOk));
    };

    const handleUndoDeleteClick = async () => {
        await dispatch(undoDeleteDishAdmin(deleteAlert.data.id))
            .then(() => {
                setDeleteAlert({});
            })
            .then(() => fetchData());
    };

    const handleActionButtonTurnOffClick = (data) => {
        async function onOk() {
            const modifiedItem = {
                ...data,
                isActive: false,
            };
            await dispatch(updateDishAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Dish, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        async function onOk() {
            const modifiedItem = {
                ...data,
                isActive: true,
            };
            await dispatch(updateDishAdmin(modifiedItem)).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Dish, onOk));
    };

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        const priceParse = parseInt(values.price.replace(/[^0-9]/g, ''));
                        const modifiedItem = {
                            ...values,
                            price: priceParse,
                            cover: values.cover !== undefined ? values.cover.file.originFileObj : null,
                        };
                        await dispatch(createDishAdmin(modifiedItem)).then((result) => {
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
                        let priceParse = 0;
                        if (!Number.isInteger(values.price)) {
                            priceParse = parseInt(values.price.replace(/[^0-9]/g, ''));
                        } else {
                            priceParse = values.price;
                        }

                        const modifiedItem = {
                            ...values,
                            price: priceParse,
                            cover: values.cover !== undefined ? values.cover.file.originFileObj : null,
                        };
                        await dispatch(updateDishAdmin(modifiedItem)).then((result) => {
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
        defaultFile,
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
        deleteAlert,
        handleUndoDeleteClick,
        setDeleteAlert,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
