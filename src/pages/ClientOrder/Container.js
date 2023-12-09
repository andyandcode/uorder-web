import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../../components/FullPageLoading/LoadingSlice';
import { rootKeys } from '../../configuration/routesConfig';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { bookingClient, getAvailableCodesClient } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const [orderForm] = Form.useForm();
    const [orderData, setOrderData] = useState(JSON.parse(localStorage.getItem('cartItems')));
    const [listDiscountData, setListDiscountData] = useState([]);
    const [discountData, setDiscountData] = useState(null);
    const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
    const [openDiscountDrawer, setOpenDiscountDrawer] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [paymentSelectTarget, setPaymentSelectTarget] = useState({
        id: 1,
        label: 'VnPay',
        value: 0,
        icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png',
    });

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getAvailableCodesClient(orderData)).then((result) => {
                setListDiscountData(Utils.getValues(result, 'payload', []));
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

    const handleDiscountCardClick = (data) => {
        setDiscountData(data);
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    useEffect(() => {
        orderForm.setFieldsValue({ ...orderData });
    }, [orderData]);

    const handleUseDiscountClick = (data) => {
        setOrderData({ ...orderData, discount: data, total: orderData.subTotal - data });
        setOpenDiscountDrawer(false);
    };

    const onClosePaymentDrawer = () => {
        setOpenPaymentDrawer(false);
    };

    const onCloseDiscountDrawer = () => {
        setOpenDiscountDrawer(false);
    };

    const handleBackToHomeClick = () => {
        history(`${rootKeys.clientHomeRoorUrl}/${location.state.preId.tableId}`);
    };

    const handleSelectPaymentClick = () => {
        setOpenPaymentDrawer(true);
    };

    const handleSelectDiscountClick = () => {
        setOpenDiscountDrawer(true);
    };

    const handleSelectPayment = (e) => {
        setPaymentSelectTarget(e);
    };

    const handleOrderClick = async () => {
        const modifiedItem = {
            ...orderForm.getFieldsValue(),
            tableId: location.state.preId.tableId,
        };
        await dispatch(bookingClient(modifiedItem)).then((result) => {
            window.location.replace(Utils.getValues(result, 'payload', []));
        });
    };

    const containerProps = {
        ...props,
        history,
        t,
        location,
        handleBackToHomeClick,
        orderForm,
        orderData,
        onClosePaymentDrawer,
        handleSelectPaymentClick,
        openPaymentDrawer,
        handleSelectPayment,
        paymentSelectTarget,
        handleSelectDiscountClick,
        openDiscountDrawer,
        onCloseDiscountDrawer,
        handleOrderClick,
        listDiscountData,
        childrenDrawer,
        handleDiscountCardClick,
        onChildrenDrawerClose,
        discountData,
        handleUseDiscountClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
