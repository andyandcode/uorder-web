import { Drawer } from 'antd';

export default function SelectDiscountDrawer({ t, onCloseDiscountDrawer, openDiscountDrawer }) {
    return (
        <>
            <Drawer
                title={t('main.pages.booking.discount_title')}
                placement={'bottom'}
                closable={false}
                onClose={onCloseDiscountDrawer}
                open={openDiscountDrawer}
                key={'Drawer'}
            >
                <p>{t('main.pages.booking.no_code')}</p>
            </Drawer>
        </>
    );
}
