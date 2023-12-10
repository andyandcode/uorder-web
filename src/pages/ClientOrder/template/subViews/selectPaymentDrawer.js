import { Drawer } from 'antd';
import { Selector } from 'antd-mobile';

export default function SelectPaymentDrawer({ t, onClosePaymentDrawer, openPaymentDrawer, handleSelectPayment }) {
    const data = [
        {
            id: 1,
            label: 'VnPay',
            value: 0,
            icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png',
        },
        {
            id: 1,
            label: 'Cash',
            value: 1,
            icon: 'https://cdn.icon-icons.com/icons2/2427/PNG/512/cash_icon_147027.png',
            disabled: true,
        },
    ];
    return (
        <>
            <Drawer
                title={t('main.pages.booking.payment_method_title')}
                placement={'bottom'}
                closable={false}
                onClose={onClosePaymentDrawer}
                open={openPaymentDrawer}
                key={'Drawer'}
            >
                <Selector
                    columns={1}
                    options={data}
                    defaultValue={[0]}
                    onChange={(arr, extend) => handleSelectPayment(extend.items[0])}
                />
            </Drawer>
        </>
    );
}
