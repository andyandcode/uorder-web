import { Drawer } from 'antd';

export default function SelectDiscountDrawer({ t, onCloseDiscountDrawer, openDiscountDrawer }) {
    return (
        <>
            <Drawer
                title={t('main.pages.order.discount_title')}
                placement={'bottom'}
                closable={false}
                onClose={onCloseDiscountDrawer}
                open={openDiscountDrawer}
                key={'Drawer'}
            >
                <p>{t('main.pages.order.no_code')}</p>
            </Drawer>
        </>
    );
}
