import { Form, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Cookies from 'universal-cookie';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { EnumKey } from '../../../components/EnumRender';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { UseNotification } from '../../../components/UseNotification';
import Config from '../../../configuration';
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
    const cookies = new Cookies();

    const [viewData, setViewData] = useState();

    const orderStatusSelect = EnumKey.OrderStatusKey(t);
    const paymentStatusSelect = EnumKey.PaymentStatusKey(t);

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getListOrderAdmin()).then((result) => {
                setTableData({ dataSource: Utils.getValues(result, 'payload', []) });
                setRootTableData(Utils.getValues(result, 'payload', []));
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
                    .then(async () => {
                        const cookieData = cookies.get(Config.storageKey.tokenKey);
                        const modifiedItem = {
                            ...values,
                            orderType: 1,
                            tableId: '',
                            moneyReceive: parseInt(values.moneyReceive.toString().replace(/[^0-9]/g, '')),
                            staff: cookieData && cookieData.data.username,
                        };
                        await dispatch(createOrderAdmin(modifiedItem)).then((result) => {
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

    const handleNewOrderClick = () => {
        setOpenCreateModel(true);
    };

    const handleChangeOrderStatus = async (status, id) => {
        await dispatch(
            updateOrderStatusAdmin([
                {
                    path: '/OrderStatus',
                    op: 'replace',
                    value: status,
                    id: id,
                },
            ]),
        )
            .then(UseNotification.Message.UpdateFinish(t), setOpenViewModel(false))
            .then(() => fetchData());
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
        handleChangeOrderStatus,
        handlePrintClick,
        openBillQuickViewModal,
        componentRef,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
