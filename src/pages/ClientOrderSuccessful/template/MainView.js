import { ResultPage } from 'antd-mobile';
import { CurrencyFormat } from '../../../components/CurrencyFormat';

export default function MainView({ t, bookingData, handleTrackBookingClick }) {
    const details = [
        {
            label: t('main.entities.table'),
            value: bookingData.tableName,
            bold: true,
        },
        {
            label: t('main.entities.payment_status.paid'),
            value: <CurrencyFormat.Minimal value={bookingData.total} />,
        },
    ];
    return (
        <>
            <ResultPage
                status='success'
                title={t('main.pages.tracker.booking_successfully_title')}
                description={t('main.pages.tracker.booking_successfully_subtitle')}
                details={details}
                primaryButtonText={t('main.components.button.track_booking')}
                onPrimaryButtonClick={handleTrackBookingClick}
            />
        </>
    );
}
