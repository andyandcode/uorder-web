import { Drawer } from 'antd';
import { CustomElement } from '../../../../components/CustomElement';

export default function SelectPaymentDrawer({ t, onClosePaymentDrawer, openPaymentDrawer, handleSelectPayment }) {
    const data = [
        {
            id: 1,
            label: 'VnPay',
            value: 0,
            icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png',
        },
        { id: 1, label: 'Cash', value: 1, icon: 'https://cdn.icon-icons.com/icons2/2427/PNG/512/cash_icon_147027.png' },
    ];
    return (
        <>
            <Drawer
                title={t('main.pages.order.payment_method_title')}
                placement={'bottom'}
                closable={false}
                onClose={onClosePaymentDrawer}
                open={openPaymentDrawer}
                key={'Drawer'}
            >
                {data.map((e, index) => (
                    <CustomElement.CustomRadio
                        name={'paymentMethod'}
                        id={index}
                        key={index}
                        data={e}
                        handleSelectPayment={handleSelectPayment}
                    />
                ))}
            </Drawer>
        </>
    );
}
