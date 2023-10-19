import { Form, message, Modal } from 'antd';
import React, { useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { EnumKey } from '../../../components/EnumRender';
import OrderData from '../../../database/order.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;
    const [filteredOrderStatus, setFilterOrderStatus] = useState(-1);
    const [filteredPaymentStatus, setFilterPaymentStatus] = useState(-1);
    const columns = TableColumns.OrderColumns(t);
    const data = OrderData;
    const [tableData, setTableData] = useState({
        dataSource: data,
        filtedOrderStatus: filteredOrderStatus,
        filtedPaymentStatus: filteredPaymentStatus,
    });
    const expandedRowRenderSelection = TableColumns.ExpandedRowRenderSelection;
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    const orderStatusSelect = EnumKey.OrderStatusKey(t);
    const paymentStatusSelect = EnumKey.PaymentStatusKey(t);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;

                setOpenCreateModel(true);
                return newLoadings;
            });
        }, 1000);
    };

    const onChangeOrderStatusSelect = (e) => {
        setFilterOrderStatus(e);
        if (e === -1) {
            setTableData({ dataSource: data });
        } else {
            setTableData({
                dataSource: data.filter((a) => a.orderStatus === e),
            });
        }
    };

    const onChangePaymentStatusSelect = (e) => {
        setFilterPaymentStatus(e);
        if (e === -1) {
            setTableData({ dataSource: data });
        } else {
            setTableData({
                dataSource: data.filter((a) => a.paymentStatus === e),
            });
        }
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

    const handleActionButtonDeleteClick = (data) => {
        Modal.confirm({
            title: t('app.notification.table.deleteAction.title'),
            content: t('app.notification.table.deleteAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.deleteAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
            okType: 'danger',
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOffClick = (data) => {
        Modal.confirm({
            title: t('app.notification.table.turnOffActiveAction.title'),
            content: t('app.notification.table.turnOffActiveAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.turnOffActiveAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
            okType: 'danger',
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOnClick = (data) => {
        Modal.confirm({
            title: t('app.notification.table.turnOnActiveAction.title'),
            content: t('app.notification.table.turnOnActiveAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.turnOnActiveAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
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
                    .open({
                        type: 'loading',
                        content: t('app.notification.form.actionInProgress'),
                        duration: 2.5,
                    })
                    .then(() => {
                        message.success(t('app.notification.form.createFinish'), 2);
                        setOpenCreateModel(false);
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                message.error(t('app.notification.form.createFinishFail'), 2);
            });
    };

    const handleEditSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                console.log('Edited: ', values);
                messageApi
                    .open({
                        type: 'loading',
                        content: t('app.notification.form.actionInProgress'),
                        duration: 2.5,
                    })
                    .then(() => {
                        message.success(t('app.notification.form.editFinish'), 2);
                        setOpenEditModel(false);
                    })
                    .then(() => editForm.resetFields());
            })
            .catch(() => {
                message.error(t('app.notification.form.editFinishFail'), 2);
            });
    };

    const handleRefreshDataClick = (index) => {
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
        data,
        loadings,
        openCreateModel,
        openEditModel,
        createForm,
        editForm,
        messageContextHolder,
        loadingTable,
        loadingsRefreshButton,
        enterLoading,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        handleRefreshDataClick,
        expandedRowRenderSelection,
        orderStatusSelect,
        paymentStatusSelect,
        onChangePaymentStatusSelect,
        tableData,
        onChangeOrderStatusSelect,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
