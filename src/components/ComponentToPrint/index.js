import { Col, Divider, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import CurrencyFormat from '../CurrencyFormat';

const OrderBill = React.forwardRef(({ data, componentRef }) => {
    const { t } = useTranslation();
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div ref={componentRef} style={{ width: 300 }}>
                <Typography.Title level={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    RECEIPT
                </Typography.Title>
                <Row style={{ marginTop: 8 }}>
                    <Col flex='auto'>
                        <Typography.Text>{data.id}</Typography.Text>
                    </Col>
                    <Col flex='auto' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Typography.Text>{moment(data.createdAt).format('hh:mm:ss DD/MM/YYYY')}</Typography.Text>
                    </Col>
                </Row>
                <Divider style={{ margin: '4px 0px' }} />
                {data.orderDetails.map((e) => (
                    <>
                        <Row>
                            <Col flex='auto'>
                                {e.qty} x {e.dishName}
                            </Col>
                            <Col
                                flex='auto'
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}
                            >
                                <CurrencyFormat value={e.amount} />
                            </Col>
                        </Row>
                        {e.dishNote != null && e.dishNote.length > 0 ? (
                            <Typography.Text type='secondary'>{e.dishNote}</Typography.Text>
                        ) : (
                            ''
                        )}
                    </>
                ))}
                {data.note != null && (
                    <>
                        <Divider style={{ margin: '4px 0px' }} />
                        <Typography.Text type='secondary'>{data.note}</Typography.Text>
                    </>
                )}
                <Divider style={{ margin: '8px 0px' }} />
                <Row style={{ width: '100%', marginBottom: 4 }}>
                    <Col flex={6}>{t('main.entities.subtotal')}</Col>
                    <Col flex={6} style={{ display: 'inline-flex', justifyContent: 'end' }}>
                        <CurrencyFormat value={data.total} />
                    </Col>
                </Row>
                <Row style={{ width: '100%', marginBottom: 4 }}>
                    <Col flex={6}>{t('main.entities.discount')}</Col>
                    <Col
                        flex={6}
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'end',
                        }}
                    >
                        <NumericFormat thousandSeparator=',' displayType='text' defaultValue={0} suffix=' VND' />
                    </Col>
                </Row>
                <Row style={{ width: '100%', marginBottom: 4 }}>
                    <Col flex={6}>
                        <Typography.Title level={4}>{t('main.entities.total')}</Typography.Title>
                    </Col>
                    <Col
                        flex={6}
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Typography.Title level={4}>
                            <CurrencyFormat value={data.total} />
                        </Typography.Title>
                    </Col>
                </Row>
                <Typography.Title level={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    THANK YOU!
                </Typography.Title>
            </div>
        </div>
    );
});

export const ComponentToPrint = { OrderBill };
