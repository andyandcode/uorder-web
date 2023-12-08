import { LeftOutlined } from '@ant-design/icons';
import { Button, Layout, Typography } from 'antd';
import { FormBuilder } from '../../../components/FormBuilder';
import SelectDiscountDrawer from './subViews/selectDiscountDrawer';
import SelectPaymentDrawer from './subViews/selectPaymentDrawer';

export default function MainView({
    t,
    handleBackToHomeClick,
    orderForm,
    orderData,
    handleSelectPaymentClick,
    onClosePaymentDrawer,
    openPaymentDrawer,
    handleSelectPayment,
    paymentSelectTarget,
    onCloseDiscountDrawer,
    openDiscountDrawer,
    handleSelectDiscountClick,
    handleOrderClick,
    listDiscountData,
    childrenDrawer,
    handleDiscountCardClick,
    onChildrenDrawerClose,
    discountData,
    handleUseDiscountClick,
}) {
    return (
        <>
            <Layout.Content>
                <Button type='text' onClick={handleBackToHomeClick} icon={<LeftOutlined />} />
                <Layout.Content style={{ padding: 8 }}>
                    <Typography.Title level={4}>{t('main.pages.booking.title')}</Typography.Title>
                    <FormBuilder.OrderForm
                        t={t}
                        form={orderForm}
                        orderData={orderData}
                        handleSelectPaymentClick={handleSelectPaymentClick}
                        handleSelectDiscountClick={handleSelectDiscountClick}
                        paymentSelectTarget={paymentSelectTarget}
                        handleOrderClick={handleOrderClick}
                    />
                </Layout.Content>
                <SelectPaymentDrawer
                    t={t}
                    onClosePaymentDrawer={onClosePaymentDrawer}
                    openPaymentDrawer={openPaymentDrawer}
                    handleSelectPayment={handleSelectPayment}
                />
                <SelectDiscountDrawer
                    handleUseDiscountClick={handleUseDiscountClick}
                    discountData={discountData}
                    childrenDrawer={childrenDrawer}
                    handleDiscountCardClick={handleDiscountCardClick}
                    onChildrenDrawerClose={onChildrenDrawerClose}
                    listDiscountData={listDiscountData}
                    t={t}
                    onCloseDiscountDrawer={onCloseDiscountDrawer}
                    openDiscountDrawer={openDiscountDrawer}
                />
            </Layout.Content>
        </>
    );
}
