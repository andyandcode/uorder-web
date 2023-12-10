import { Layout } from 'antd';
import { NavBar } from 'antd-mobile';
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
                <NavBar onBack={handleBackToHomeClick}>{t('main.pages.booking.title')}</NavBar>
                <Layout.Content style={{ padding: 8 }}>
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
