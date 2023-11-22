import { Form } from 'antd';
import React, { useState } from 'react';
import { rootKeys } from '../../configuration/routesConfig';
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
        label: 'Momo',
        value: 0,
        icon: 'https://s3.ap-southeast-1.amazonaws.com/images-storage.jobstack.vn/0b20e86c-69c3-4a5c-b145-55ef95bc5c3f.png',
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

    const handleOrderClick = () => {
        const modifiedItem = {
            ...orderForm.getFieldsValue(),
            tableId: location.state.preId.tableId,
        };
        dispatch(bookingClient(modifiedItem));
        history(`/booking/successfully/${location.state.preId.tableId}`);
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
