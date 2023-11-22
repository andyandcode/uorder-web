import { CheckCircleOutlined, CreditCardOutlined, PrinterOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row, Skeleton, Typography } from 'antd';
import Countdown, { zeroPad } from 'react-countdown';
import { CurrencyFormat } from '../../../../../components/CurrencyFormat';
import { EnumRender } from '../../../../../components/EnumRender';

export default function BookingCard({
    t,
    cardLoading,
    currentBookingData,
    handlePrintBillClick,
    handleViewBookingDetailClick,
    handlePayBillClick,
    handleCompleteOrderClick,
}) {
    const Completionist = () => <Typography.Text type='danger'>Done!!!</Typography.Text>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <span>
                    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            );
        }
    };

    return (
        <>
            <Flex wrap='wrap' gap='small'>
                {currentBookingData.map((e) => (
                    <Card
                        style={{
                            width: 300,
                            marginTop: 16,
                        }}
                        actions={[
                            <Button
                                icon={<PrinterOutlined key='printBill' />}
                                type='text'
                                size='small'
                                onClick={() => handlePrintBillClick(e)}
                            />,
                            <Button
                                icon={<ReconciliationOutlined key='viewDetail' />}
                                type='text'
                                size='small'
                                onClick={() => handleViewBookingDetailClick(e)}
                            />,
                            <Button
                                icon={<CreditCardOutlined key='pay' />}
                                type='text'
                                disabled={!e.paymentStatus}
                                size='small'
                                onClick={() => handlePayBillClick(e)}
                            />,
                            <Button
                                icon={<CheckCircleOutlined key='completeOrder' />}
                                type='text'
                                disabled={!e.timeToReceive > 0}
                                size='small'
                                onClick={() => handleCompleteOrderClick(e)}
                            />,
                        ]}
                    >
                        <Skeleton loading={cardLoading} active>
                            <Card.Meta
                                title={
                                    <Row>
                                        <Col flex='auto'>{e.tableName}</Col>
                                        <Col spae={4}>
                                            <Countdown date={Date.now() + e.timeToReceive} renderer={renderer} />
                                        </Col>
                                    </Row>
                                }
                                description={[
                                    <Row>
                                        <Col flex='auto'>
                                            {EnumRender.OrderStatus(t, e.orderStatus)}
                                            {EnumRender.PaymentStatus(t, e.paymentStatus)}
                                        </Col>
                                        <Col spae={4}>
                                            <Typography.Text style={{ color: !e.paymentStatus ? 'gray' : 'red' }}>
                                                <CurrencyFormat.Minimal value={e.total} />
                                            </Typography.Text>
                                        </Col>
                                    </Row>,
                                ]}
                            />
                        </Skeleton>
                    </Card>
                ))}
            </Flex>
        </>
    );
}
