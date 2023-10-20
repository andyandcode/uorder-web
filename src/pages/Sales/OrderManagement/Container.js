import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { EnumKey } from '../../../components/EnumRender';
import { UseNotification, UserAction } from '../../../components/UseNotification';
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
        dataSource: [],
        filtedOrderStatus: filteredOrderStatus,
        filtedPaymentStatus: filteredPaymentStatus,
    });
    const expandedRowRenderSelection = TableColumns.ExpandedRowRenderSelection;
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    const orderStatusSelect = EnumKey.OrderStatusKey(t);
    const paymentStatusSelect = EnumKey.PaymentStatusKey(t);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            setTableData({ dataSource: data });
            setLoadingTable(false);
        }, 500);
    }, [data]);

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

    const handleActionButtonViewClick = (data) => {
        console.log('sad');
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

    const handleNewOrderClick = () => {
        setOpenCreateModel(true);
    };

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        data,
        openCreateModel,
        openEditModel,
        createForm,
        editForm,
        messageContextHolder,
        loadingTable,
        tableData,
        orderStatusSelect,
        paymentStatusSelect,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        expandedRowRenderSelection,
        onChangePaymentStatusSelect,
        onChangeOrderStatusSelect,
        handleNewOrderClick,
        handleActionButtonViewClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
