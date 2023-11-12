import { Form } from 'antd';
import React, { useState } from 'react';
import { rootKeys } from '../../configuration/routesConfig';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location } = props;
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
        history(rootKeys.homeUrl);
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
        console.log(orderForm.getFieldsValue());
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
