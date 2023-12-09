import { CaretRightOutlined } from '@ant-design/icons';
import { Col, Result, Row, Space, Typography } from 'antd';
import { Collapse, Divider, Steps } from 'antd-mobile';
import { ArrowDownCircleOutline } from 'antd-mobile-icons';
import moment from 'moment';
import { ButtonLocated } from '../../../components/ButtonLocated';
import { CurrencyFormat } from '../../../components/CurrencyFormat';
import { EnumRender } from '../../../components/EnumRender';
import { SelectLanguageMobile } from '../../../components/UseLanguages';

export default function MainView({
    t,
    orderData,
    handlePayBookingClick,
    handleCallStaffClick,
    callStaffLoading,
    callStaffDisabled,
}) {
    return (
        <>
            {orderData.length === 0 ? (
                <Result
                    status='500'
                    title={t('main.pages.tracker.404_title')}
                    subTitle={t('main.pages.tracker.404_subtitle')}
                />
            ) : (
                <div style={{ padding: 8 }}>
                    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography.Title level={4}>{t('main.pages.tracker.title')}</Typography.Title>
                        <SelectLanguageMobile />
                    </Space>
                    <Steps current={2}>
                        <Steps.Step title={t('main.common.order_process.ordered')} />
                        <Steps.Step
                            title={t('main.common.order_process.confirmed')}
                            status={orderData.paymentStatus !== 0 ? 'error' : ''}
                        />
                        <Steps.Step
                            title={t('main.common.order_process.preparing')}
                            status={orderData.paymentStatus !== 0 && 'wait'}
                        />
                        <Steps.Step title={t('main.common.order_process.complete')} />
                    </Steps>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            marginTop: 8,
                        }}
                    >
                        <Collapse.Panel
                            key='1'
                            title={t('main.pages.tracker.booking_overview')}
                            arrow={<ArrowDownCircleOutline />}
                        >
                            <>
                                <Row gutter={[8, 8]}>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.pages.tracker.booking')} <span>{orderData.id}</span>
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.pages.tracker.booking_at')}
                                        <span>{moment(orderData.createdAd).format('hh:mm DD/MM/YYYY')}</span>
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.pages.tracker.booking_status')}
                                        {EnumRender.OrderStatusMinimal(t, orderData.orderStatus)}
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.entities.payment_status.label')}:
                                        {EnumRender.PaymentStatusMinimal(t, orderData.paymentStatus)}
                                    </Typography.Text>
                                </Row>
                            </>
                        </Collapse.Panel>
                        <Collapse.Panel
                            key='2'
                            title={t('main.pages.tracker.booking_details')}
                            arrow={<ArrowDownCircleOutline />}
                        >
                            <>
                                {orderData.orderDetails.map((e) => (
                                    <>
                                        <Row gutter={[8, 0]} style={{ marginBottom: 20 }}>
                                            <Col flex='auto'>
                                                <Row>
                                                    <Typography.Text strong>{e.dishName}</Typography.Text>
                                                </Row>
                                                <Row style={{ marginBottom: 4, width: '100%' }}>
                                                    <Col
                                                        flex='auto'
                                                        style={{
                                                            display: 'inline-flex',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <CurrencyFormat.Minimal value={e.unitPrice} />
                                                    </Col>
                                                    <Col
                                                        flex='auto'
                                                        style={{
                                                            display: 'inline-flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        x{e.qty}
                                                    </Col>
                                                    <Col
                                                        flex='auto'
                                                        style={{
                                                            display: 'inline-flex',
                                                            justifyContent: 'end',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <CurrencyFormat.Minimal value={e.amount} />
                                                    </Col>
                                                </Row>
                                                {e.dishNote != null && e.dishNote.length > 0 ? (
                                                    <Row>
                                                        <Col flex='auto' style={{ display: 'flex' }}>
                                                            <Typography.Text type='secondary'>
                                                                {e.dishNote}
                                                            </Typography.Text>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                        </Row>
                                    </>
                                ))}
                                {orderData.note != null && (
                                    <>
                                        <Divider />
                                        <Typography.Text type='secondary'>{orderData.note}</Typography.Text>
                                    </>
                                )}
                            </>
                        </Collapse.Panel>
                        <Collapse.Panel
                            key='3'
                            title={t('main.pages.tracker.booking_summary')}
                            arrow={<ArrowDownCircleOutline />}
                        >
                            <>
                                <Row gutter={[8, 8]}>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.entities.subtotal')}:{' '}
                                        {<CurrencyFormat.Minimal value={orderData.subtotal} />}
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.entities.discount')}:{' '}
                                        {<CurrencyFormat.Minimal value={orderData.discount} />}
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        {t('main.entities.total')}: {<CurrencyFormat.Minimal value={orderData.total} />}
                                    </Typography.Text>
                                </Row>
                            </>
                        </Collapse.Panel>
                    </Collapse>
                    <Space
                        direction='vertical'
                        style={{
                            width: '100%',
                            marginTop: 20,
                        }}
                    >
                        {orderData.paymentStatus !== 0 && (
                            <ButtonLocated.PayButton handleButton={handlePayBookingClick} />
                        )}
                        <ButtonLocated.CallStaffButton
                            handleButton={handleCallStaffClick}
                            callStaffLoading={callStaffLoading}
                            callStaffDisabled={callStaffDisabled}
                        />
                    </Space>
                </div>
            )}
        </>
    );
}
