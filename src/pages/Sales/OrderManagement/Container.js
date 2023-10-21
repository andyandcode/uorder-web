import { Form, message } from 'antd';
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
    const [viewForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openViewModel, setOpenViewModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    const [viewData, setViewData] = useState();

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

    const handleViewCancelClick = () => {
        setOpenViewModel(false);
    };

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };

    const handleActionButtonViewClick = (data) => {
        setViewData(data);
        // viewForm.setFieldsValue({ ...data });
        setOpenViewModel(true);
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
        openViewModel,
        createForm,
        viewForm,
        messageContextHolder,
        loadingTable,
        tableData,
        orderStatusSelect,
        paymentStatusSelect,
        handleCreateSubmitClick,
        handleViewCancelClick,
        handleCreateCancelClick,
        expandedRowRenderSelection,
        onChangePaymentStatusSelect,
        onChangeOrderStatusSelect,
        handleNewOrderClick,
        handleActionButtonViewClick,
        viewData,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
