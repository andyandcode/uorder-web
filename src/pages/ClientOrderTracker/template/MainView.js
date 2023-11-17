import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Divider, Result, Row, Space, Typography, theme } from 'antd';
import Countdown, { zeroPad } from 'react-countdown';
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
    const Completionist = () => <Typography.Text>{t('main.pages.tracker.completed_note')}</Typography.Text>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <span>
                    <Typography.Text strong>
                        {t('main.pages.tracker.in_progess_note')} {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}{' '}
                    </Typography.Text>
                </span>
            );
        }
    };
    const getItems = (panelStyle) => [
        {
            key: '1',
            label: t('main.pages.tracker.order_overview'),
            children: (
                <>
                    <Row gutter={[8, 8]}>
                        <Typography.Text style={{ width: '100%' }}>
                            {t('main.pages.tracker.order')} {orderData.id}
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%' }}>
                            {t('main.entities.order_status.label')}: {EnumRender.OrderStatus(t, orderData.orderStatus)}
                        </Typography.Text>
                        <Typography.Text style={{ width: '100%' }}>
                            {t('main.entities.payment_status.label')}:{' '}
                            {EnumRender.PaymentStatus(t, orderData.paymentStatus)}
                        </Typography.Text>
                    </Row>
                </>
            ),
            style: panelStyle,
        },
        {
            key: '2',
            label: t('main.pages.tracker.order_details'),
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
    ];
    return (
        <>
            {orderData.length === 0 ? (
                <Result
                    status='success'
                    title={t('main.pages.tracker.order_successfully_title')}
                    subTitle={t('main.pages.tracker.order_successfully_subtitle')}
                />
            ) : (
                <div style={{ padding: 8 }}>
                    <Typography.Title level={4}>{t('main.pages.tracker.title')}</Typography.Title>
                    <Countdown date={Date.now() + orderData.timeToReceive} renderer={renderer} />
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
