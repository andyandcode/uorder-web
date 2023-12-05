import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Divider, Result, Row, Space, Typography, theme } from 'antd';
import moment from 'moment';
import { CurrencyFormat } from '../../../components/CurrencyFormat';
import { EnumRender } from '../../../components/EnumRender';

export default function MainView({ t, orderData }) {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const getItems = (panelStyle) => [
        {
            key: '1',
            label: t('main.pages.tracker.booking_overview'),
            children: (
                <>
                    <Row gutter={[8, 8]}>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.pages.tracker.booking')} <span>{orderData.id}</span>
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.pages.tracker.booking_at')}
                            <span>{moment(orderData.createdAd).format('hh:mm DD/MM/YYYY')}</span>
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.pages.tracker.booking_status')}
                            {EnumRender.OrderStatusMinimal(t, orderData.orderStatus)}
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.entities.payment_status.label')}:
                            {EnumRender.PaymentStatusMinimal(t, orderData.paymentStatus)}
                        </Typography.Text>
                    </Row>
                </>
            ),
            style: panelStyle,
        },
        {
            key: '3',
            label: t('main.pages.tracker.booking_details'),
            children: (
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
                                                <Typography.Text type='secondary'>{e.dishNote}</Typography.Text>
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
            ),
            style: panelStyle,
        },
        {
            key: '4',
            label: t('main.pages.tracker.booking_summary'),
            children: (
                <>
                    <Row gutter={[8, 8]}>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.entities.subtotal')}: {<CurrencyFormat.Minimal value={orderData.subtotal} />}
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.entities.discount')}: {<CurrencyFormat.Minimal value={orderData.discount} />}
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            {t('main.entities.total')}: {<CurrencyFormat.Minimal value={orderData.total} />}
                        </Typography.Text>
                    </Row>
                </>
            ),
            style: panelStyle,
        },
    ];
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
                    <Typography.Title level={4}>{t('main.pages.tracker.title')}</Typography.Title>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            background: token.colorBgContainer,
                            marginTop: 8,
                        }}
                        items={getItems(panelStyle)}
                    />
                    <Space
                        direction='vertical'
                        style={{
                            width: '100%',
                        }}
                    >
                        {orderData.paymentStatus !== 0 && (
                            <Button type='primary' block>
                                Thanh toán
                            </Button>
                        )}
                        <Button block>{t('main.components.button.call_staff')}</Button>
                    </Space>
                </div>
            )}
        </>
    );
}
