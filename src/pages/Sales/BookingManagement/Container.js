import * as signalR from '@microsoft/signalr';
import { Form, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import { updateOrderStatusAdmin } from '../OrderManagement/Slice';
import propsProvider from './PropsProvider';
import { getListBookingAdmin, getListCurrentBookingAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [currentBookingData, setCurrentBookingData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [cardLoading, setCardLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [openViewModel, setOpenViewModel] = useState(false);
    const [openPayBillModal, setOpenPayBillModal] = useState(false);
    const [viewData, setViewData] = useState();
    const columns = TableColumns.OrderColumns(t);
    const [openBillQuickViewModal, setOpenBillQuickViewModal] = useState(false);
    const [payBillForm] = Form.useForm();
    const [orderNotification, setOrderNotification] = useState('');
    const [messageApi, messageContextHolder] = message.useMessage();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7297/bookingHub')
            .configureLogging(signalR.LogLevel.Information)
            .build();
        connection
            .start()
            .then(() => console.log('Connection established'))
            .catch((err) => console.error('SignalR Connection Error: ', err));

        connection.on('ReceiveMessage', (message) => {
            fetchData();
        });
        connection.on('ReceiveOrderNotification', (bookingId) => {
            fetchData();
        });

        return () => {
            connection.stop();
        };
    }, []);

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getListBookingAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
            await dispatch(getListCurrentBookingAdmin()).then((result) => {
                setCurrentBookingData(Utils.getValues(result, 'payload', []));
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTable(false);
            setCardLoading(false);
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const handlePrintBillClick = (data) => {
        setViewData(data);
        setOpenBillQuickViewModal(true);
        setTimeout(() => {
            setOpenBillQuickViewModal(false);
            handlePrint();
        }, 500);
    };

    const handleViewBookingDetailClick = (data) => {
        setViewData(data);
        setOpenViewModel(true);
    };

    const handlePayBillClick = (data) => {
        setOpenViewModel(false);
        setViewData(data);
        setOpenPayBillModal(true);
    };

    const handleCompleteOrderClick = async (data) => {
        await dispatch(
            updateOrderStatusAdmin([
                {
                    path: '/OrderStatus',
                    op: 'replace',
                    value: 2,
                    id: data.id,
                },
            ]),
        )
            .then(UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish), setOpenViewModel(false))
            .then(() => fetchData());
    };

    const handleViewCancelClick = () => {
        setOpenViewModel(false);
    };

    const handleActionButtonViewClick = (data) => {
        setViewData(data);
        // viewForm.setFieldsValue({ ...data });
        setOpenViewModel(true);
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
            .then(UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish), setOpenViewModel(false))
            .then(() => fetchData());
    };
    const componentRef = useRef();
    const handlePrintClick = (data) => {
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

    const handlePayBillSubmitClick = (data) => {
        payBillForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        await dispatch(
                            updateOrderStatusAdmin([
                                {
                                    path: '/MoneyChange',
                                    op: 'replace',
                                    value: data.moneyChange,
                                    id: data.id,
                                },
                                {
                                    path: '/MoneyReceive',
                                    op: 'replace',
                                    value: parseInt(data.moneyReceive.toString().replace(/[^0-9]/g, '')),
                                    id: data.id,
                                },
                                {
                                    path: '/PaymentMethod',
                                    op: 'replace',
                                    value: data.paymentMethod,
                                    id: data.id,
                                },
                                {
                                    path: '/PaymentStatus',
                                    op: 'replace',
                                    value: data.paymentStatus,
                                    id: data.id,
                                },
                            ]),
                        ).then((result) => {
                            UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                            setOpenPayBillModal(false);
                            fetchData();
                        });
                    })
                    .then(() => payBillForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.CreateFinishFail);
            });
    };
    const handlePayBillCancelClick = (data) => {
        setOpenPayBillModal(false);
    };

    const containerProps = {
        ...props,
        history,
        t,
        currentBookingData,
        handlePrintBillClick,
        handleViewBookingDetailClick,
        handlePayBillClick,
        cardLoading,
        handleCompleteOrderClick,
        openViewModel,
        viewData,
        handleViewCancelClick,
        columns,
        tableData,
        loadingTable,
        handleActionButtonViewClick,
        handlePrintClick,
        handleChangeOrderStatus,
        openBillQuickViewModal,
        componentRef,
        openPayBillModal,
        handlePayBillCancelClick,
        handlePayBillSubmitClick,
        payBillForm,
        messageContextHolder,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
