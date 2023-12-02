import { Form } from 'antd';
import React, { useState } from 'react';
import { rootKeys } from '../../configuration/routesConfig';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { bookingClient } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const [orderForm] = Form.useForm();
    const [orderData, setOrderData] = useState(location.state.data);
    const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
    const [openDiscountDrawer, setOpenDiscountDrawer] = useState(false);
    const [paymentSelectTarget, setPaymentSelectTarget] = useState({
        id: 1,
        label: 'VnPay',
        value: 0,
        icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png',
    });

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
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
