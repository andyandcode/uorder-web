import { Drawer, Space, Typography } from 'antd';
import moment from 'moment';
import { CurrencyFormat } from '../../../../components/CurrencyFormat';
import DiscountCard from '../../../../components/DiscountCard';

export default function SelectDiscountDrawer({
    t,
    onCloseDiscountDrawer,
    openDiscountDrawer,
    listDiscountData,
    childrenDrawer,
    handleDiscountCardClick,
    onChildrenDrawerClose,
    discountData,
    handleUseDiscountClick,
}) {
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
                {listDiscountData == null ? (
                    <p>{t('main.pages.booking.no_code')}</p>
                ) : (
                    <Space size={'large'} direction='vertical' style={{ width: '100%' }}>
                        {listDiscountData.map((i, index) => (
                            <>
                                <DiscountCard
                                    t={t}
                                    key={`${index}-card`}
                                    onCardClick={() => handleDiscountCardClick(i)}
                                    discountData={i}
                                    handleUseDiscountClick={() => handleUseDiscountClick(i.discount)}
                                />
                                {discountData != null && (
                                    <Drawer
                                        key={`${index}-drawer`}
                                        title={discountData.code}
                                        closable={false}
                                        onClose={onChildrenDrawerClose}
                                        open={childrenDrawer}
                                        placement={'bottom'}
                                    >
                                        <Space direction='vertical'>
                                            <Typography.Title level={5}>
                                                {t('main.message.discount')}{' '}
                                                <CurrencyFormat.Minimal value={discountData.discount} />
                                            </Typography.Title>
                                            {discountData.appliesToAllProducts && (
                                                <Typography.Text>
                                                    {t('main.entities.applies_to_all_products')}
                                                </Typography.Text>
                                            )}
                                            {discountData.applicableProductIds.length > 0 && (
                                                <Typography.Text>
                                                    {t('main.message.apply_when_purchase')}{' '}
                                                    {discountData.applicableProductIds.map((i) => (
                                                        <li>{i.name}</li>
                                                    ))}
                                                </Typography.Text>
                                            )}
                                            {discountData.minOrderAmountRequired > 0 && (
                                                <Typography.Text>
                                                    {t('main.message.apply_order_from')}
                                                    <CurrencyFormat.Minimal
                                                        value={discountData.minOrderAmountRequired}
                                                    />
                                                </Typography.Text>
                                            )}
                                            {discountData.percentage > 0 && (
                                                <Typography.Text>
                                                    {t('main.message.percentage_mess', {
                                                        percentage: discountData.percentage,
                                                        minimum: discountData.minDiscountAmount.toLocaleString(),
                                                        maximum: discountData.maxDiscountAmount.toLocaleString(),
                                                    })}
                                                    <CurrencyFormat.Minimal
                                                        value={discountData.minOrderAmountRequired}
                                                    />
                                                </Typography.Text>
                                            )}
                                            <Typography.Text type='secondary'>
                                                {t('main.message.valid_till')}{' '}
                                                {moment(discountData.endDate).format('DD/MM/YYYY')}
                                            </Typography.Text>
                                        </Space>
                                    </Drawer>
                                )}
                            </>
                        ))}
                    </Space>
                )}
            </Drawer>
        </>
    );
}
