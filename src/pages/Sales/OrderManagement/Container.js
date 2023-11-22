import { Form, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { EnumKey } from '../../../components/EnumRender';
import { UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { createOrderAdmin, getListOrderAdmin, updateOrderStatusAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [filteredOrderStatus, setFilterOrderStatus] = useState(-1);
    const [filteredPaymentStatus, setFilterPaymentStatus] = useState(-1);
    const columns = TableColumns.OrderColumns(t);
    const [tableData, setTableData] = useState({
        dataSource: [],
        filtedOrderStatus: filteredOrderStatus,
        filtedPaymentStatus: filteredPaymentStatus,
    });
    const [rootTableData, setRootTableData] = useState();
    const expandedRowRenderSelection = TableColumns.ExpandedRowRenderSelection;
    const [createForm] = Form.useForm();
    const [viewForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openBillQuickViewModal, setOpenBillQuickViewModal] = useState(false);
    const [openViewModel, setOpenViewModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    const [viewData, setViewData] = useState();
    const [dishData, setDishData] = useState();

    const orderStatusSelect = EnumKey.OrderStatusKey(t);
    const paymentStatusSelect = EnumKey.PaymentStatusKey(t);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListOrderAdmin())
                .then((result) => {
                    setTableData({ dataSource: Utils.getValues(result, 'payload', []) });
                })
                .then(setRootTableData(tableData.dataSource));
            setLoadingTable(false);
        }, 500);
    }, [dispatch]);

    const getNewTableData = () => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListOrderAdmin()).then((result) => {
                setTableData({ dataSource: Utils.getValues(result, 'payload', []) });
            });
            setLoadingTable(false);
        }, 500);
    };

    const onChangeOrderStatusSelect = (e) => {
        setFilterOrderStatus(e);
        if (e === -1) {
            setTableData({ dataSource: rootTableData });
        } else {
            setTableData({
                dataSource: rootTableData.filter((a) => a.orderStatus === e),
            });
        }
    };

    const onChangePaymentStatusSelect = (e) => {
        setFilterPaymentStatus(e);
        if (e === -1) {
            setTableData({ dataSource: rootTableData });
        } else {
            setTableData({
                dataSource: rootTableData.filter((a) => a.paymentStatus === e),
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
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        const modifiedItem = {
                            ...values,
                            orderType: 1,
                            tableId: '',
                        };
                        dispatch(createOrderAdmin(modifiedItem));
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

    const handleNewOrderClick = () => {
        setOpenCreateModel(true);
    };

    const handleChangeOrderStatus = (status, id) => {
        dispatch(
            updateOrderStatusAdmin([
                {
                    path: '/OrderStatus',
                    op: 'replace',
                    value: status,
                    id: id,
                },
            ]),
        )
            .then(UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish), setOpenViewModel(false))
            .then(getNewTableData());
    };
    const componentRef = useRef();
    const handlePrintClick = () => {
        setOpenViewModel(false);
        setOpenBillQuickViewModal(true);
        setTimeout(() => {
            setOpenBillQuickViewModal(false);
            handlePrint();
        }, 500);
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: viewData && viewData.id,
    });
    const containerProps = {
        ...props,
        history,
        t,
        columns,
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
        dishData,
        handleChangeOrderStatus,
        handlePrintClick,
        openBillQuickViewModal,
        componentRef,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
