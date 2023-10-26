import { Collapse } from 'antd';
import BookingCard from './bookingCard';

export default function CurrentBooking({
    t,
    cardLoading,
    currentBookingData,
    handlePrintBillClick,
    handleViewBookingDetailClick,
    handlePayBillClick,
    handleCompleteOrderClick,
}) {
    return (
        <>
            <Collapse
                items={[
                    {
                        key: '1',
                        label: 'Current Booking',
                        children: (
                            <BookingCard
                                t={t}
                                currentBookingData={currentBookingData}
                                cardLoading={cardLoading}
                                handlePrintBillClick={handlePrintBillClick}
                                handleViewBookingDetailClick={handleViewBookingDetailClick}
                                handlePayBillClick={handlePayBillClick}
                                handleCompleteOrderClick={handleCompleteOrderClick}
                            />
                        ),
                    },
                ]}
                ghost
                defaultActiveKey={1}
            />
        </>
    );
}
