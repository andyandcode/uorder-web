import { Divider, Layout, Typography } from 'antd';
import CustomTable from '../../../../components/CustomTable';
import TableColumns from '../../../../components/CustomTable/columnConfigs';
import BillQuickViewModal from './subView/billQuickViewModal';
import CurrentBooking from './subView/currentBooking';
import PayBillModal from './subView/payBillModal';
import ViewModal from './subView/viewModal';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView({
    t,
    cardLoading,
    currentBookingData,
    handlePrintBillClick,
    handleViewBookingDetailClick,
    handlePayBillClick,
    handleCompleteOrderClick,
    openViewModel,
    viewData,
    handleViewCancelClick,
    loadingTable,
    columns,
    tableData,
    handleActionButtonViewClick,
    expandedRowRenderSelection,
    componentRef,
    openBillQuickViewModal,
    handlePrintClick,
    messageContextHolder,
    handleChangeOrderStatus,
    handlePayBillSubmitClick,
    handlePayBillCancelClick,
    openPayBillModal,
    payBillForm,
}) {
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.sales.booking')}
                </Title>
                <CurrentBooking
                    t={t}
                    cardLoading={cardLoading}
                    currentBookingData={currentBookingData}
                    handlePrintBillClick={handlePrintBillClick}
                    handleViewBookingDetailClick={handleViewBookingDetailClick}
                    handlePayBillClick={handlePayBillClick}
                    handleCompleteOrderClick={handleCompleteOrderClick}
                />
                <Divider />
                <CustomTable
                    loadingTable={loadingTable}
                    columns={columns}
                    dataSource={tableData}
                    handleActionButtonViewClick={(data) => handleActionButtonViewClick(data)}
                    expandedRowRenderSelection={() =>
                        expandedRowRenderSelection(t, tableData, TableColumns.TableSwitch.OrderTable)
                    }
                    switchActionColumn={TableColumns.TableSwitch.OrderTable}
                />
            </Content>
            <ViewModal
                t={t}
                openViewModel={openViewModel}
                viewData={viewData}
                handleViewCancelClick={handleViewCancelClick}
                handlePrintClick={handlePrintClick}
                messageContextHolder={messageContextHolder}
                handleChangeOrderStatus={handleChangeOrderStatus}
                handlePayBillClick={handlePayBillClick}
            />
            <BillQuickViewModal
                viewData={viewData}
                componentRef={componentRef}
                openBillQuickViewModal={openBillQuickViewModal}
            />
            <PayBillModal
                t={t}
                openPayBillModal={openPayBillModal}
                handlePayBillCancelClick={handlePayBillCancelClick}
                messageContextHolder={messageContextHolder}
                viewData={viewData}
                payBillForm={payBillForm}
                handlePayBillSubmitClick={handlePayBillSubmitClick}
            />
        </>
    );
}
