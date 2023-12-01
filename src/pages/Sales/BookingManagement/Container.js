import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import TableColumns from '../../../components/CustomTable/columnConfigs';
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
    const [viewData, setViewData] = useState();
    const columns = TableColumns.OrderColumns(t);
    const [openBillQuickViewModal, setOpenBillQuickViewModal] = useState(false);

    const [orderNotification, setOrderNotification] = useState('');

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
            console.log(message);
            fetchData();
        });
        connection.on('ReceiveOrderNotification', (bookingId) => {
            console.log(bookingId);
            fetchData();
        });

        return () => {
            connection.stop();
        };
    }, []);

    const fetchData = async () => {
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
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const handlePrintBillClick = (data) => {
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

    const handlePayBillClick = (data) => {};

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
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
