import { PrinterOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import DishData from '../../database/dish.json';
import { ButtonLocated } from '../ButtonLocated';
import CurrencyFormat from '../CurrencyFormat';
import { EnumRender } from '../EnumRender';
import { FormEntities } from './formEntities';

const CreateNewDishForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ type: 0, isActive: true }}
            >
                <Row gutter={[52]}>
                    <Col span={12}>
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.CompletionTime />
                        <FormEntities.QtyPerDay />
                        <FormEntities.DishType />
                        <FormEntities.ActiveStatus />
                    </Col>
                    <Col span={12}>
                        <FormEntities.UploadMedias />
                    </Col>
                </Row>

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const EditDishForm = ({ form, handleButtonCancel, handleButtonSubmit, defaultFileList }) => {
    return (
        <>
            <Form form={form} align='end' layout='horizontal' name='form_edit_in_modal'>
                <Row gutter={[52]}>
                    <Col span={12}>
                        <FormEntities.Id />
                        <FormEntities.CreatedAt />
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.CompletionTime />
                        <FormEntities.QtyPerDay />
                        <FormEntities.DishType />
                        <FormEntities.ActiveStatus />
                    </Col>
                    <Col span={12}>
                        <FormEntities.UploadMedias defaultFileList={defaultFileList} />
                    </Col>
                </Row>

                <Space>
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.UpdateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const CreateNewMenuForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ type: 0, isActive: true }}
            >
                <Row gutter={[52]}>
                    <Col span={12}>
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.ActiveStatus />
                    </Col>
                    <Col span={12}>
                        <FormEntities.Dishes />
                    </Col>
                </Row>

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const EditMenuForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ type: 0, isActive: true }}
            >
                <Row gutter={[52]}>
                    <Col span={12}>
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.ActiveStatus />
                    </Col>
                    <Col span={12}>
                        <FormEntities.Dishes />
                    </Col>
                </Row>

                <Space>
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.UpdateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const CreateNewTableForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ type: 0, isActive: true }}
            >
                <FormEntities.Name />
                <FormEntities.Desc />
                <FormEntities.ActiveStatus />

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const EditTableForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ type: 0, isActive: true }}
            >
                <FormEntities.Name />
                <FormEntities.Desc />
                <FormEntities.ActiveStatus />

                <Space>
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.UpdateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const CreateNewOrderForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    const { t } = useTranslation();
    const data = DishData;
    const [dishData, setDishData] = useState([]);

    useEffect(() => {
        setDishData(data.filter((a) => (a.isActive = true)));
    }, [data]);

    const onFormChange = (data) => {
        const tempitem = dishData.find((a) => a.id === data.value);
        const fieldQty = form.getFieldValue([data.name[0], data.name[1], 'qty']);
        const fieldPrice = form.getFieldValue([data.name[0], data.name[1], 'unitPrice']);

        const fieldNote = form.getFieldValue('note');
        const fieldOrderStatus = form.getFieldValue('order_status');
        const fieldPaymentStatus = form.getFieldValue('payment_status');

        const arr = form.getFieldsValue();
        let total = 0;
        arr.orderDetails.map((e) => (e !== undefined ? (total += e.amount) : total));

        form.setFields([
            { name: [data.name[0], data.name[1], 'qty'], value: fieldQty === undefined ? 1 : fieldQty },
            {
                name: [data.name[0], data.name[1], 'unitPrice'],
                value: tempitem === undefined ? (fieldPrice ? fieldPrice : 0) : tempitem.price,
            },
            {
                name: [data.name[0], data.name[1], 'amount'],
                value: fieldQty * fieldPrice,
            },
            {
                name: 'total',
                value: total,
            },
            {
                name: 'note',
                value: fieldNote,
            },
            {
                name: 'order_status',
                value: fieldOrderStatus,
            },
            {
                name: 'payment_status',
                value: fieldPaymentStatus,
            },
        ]);
    };
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{
                    orderDetails: [{ dish: '', qty: 1, unitPrice: 0, amount: 0, dishNote: '' }],
                    order_status: 0,
                    payment_status: 0,
                    note: '',
                }}
                onFieldsChange={(data) => onFormChange(data[0])}
            >
                <Row gutter={[8, 0]}>
                    <Col flex='auto' style={{ display: 'flex' }}>
                        <Row style={{ marginBottom: 14, width: '100%' }}>
                            <Col flex='auto' style={{ display: 'flex' }}>
                                {t('main.entities.dishes')}
                            </Col>
                            <Col span={4} style={{ display: 'flex' }}>
                                {t('main.entities.qty')}
                            </Col>
                            <Col span={4} style={{}}>
                                {t('main.entities.unitPrice')}
                            </Col>
                            <Col span={4} style={{}}>
                                {t('main.entities.amount')}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <FormEntities.OrderDishItem dishData={dishData} />

                <FormEntities.OrderStatus hidden />
                <FormEntities.PaymentStatus />

                <Form.Item name='note'>
                    <Input.TextArea rows={3} placeholder={t('main.entities.note')}></Input.TextArea>
                </Form.Item>

                <Form.Item name='total' initialValue={0} label={t('main.entities.total')}>
                    <NumericFormat thousandSeparator=',' displayType='text' defaultValue={0} suffix=' VND' />
                </Form.Item>

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const ViewOrderForm = ({ viewData, form, handleButtonCancel, handleButtonSubmit }) => {
    const { t } = useTranslation();
    return (
        <>
            <Row style={{ marginTop: 40 }}>
                <Col flex='auto'>
                    <Typography.Title level={4}>{viewData.createdAt}</Typography.Title>
                    <Typography.Text type='secondary'>
                        {t('main.entities.id')}: {viewData.id}
                    </Typography.Text>
                </Col>
                <Col span='6' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Space>
                        {EnumRender.PaymentStatus(t, viewData.paymentStatus)}
                        {viewData.orderStatus === 2 ? EnumRender.OrderStatus(t, viewData.orderStatus) : ''}
                        {viewData.orderStatus === 3 ? EnumRender.OrderStatus(t, viewData.orderStatus) : ''}
                        {viewData.orderStatus < 2 ? (
                            <Select
                                style={{
                                    width: 120,
                                }}
                                value={viewData.orderStatus}
                            >
                                <Select.Option value={0} disabled={viewData.orderStatus > 0}>
                                    {t('main.entities.order_status.ordered')}
                                </Select.Option>
                                <Select.Option value={1} disabled={viewData.orderStatus > 1}>
                                    {t('main.entities.order_status.to_receive')}
                                </Select.Option>
                                <Select.Option
                                    value={2}
                                    disabled={viewData.orderStatus > 2 || viewData.orderStatus === 0}
                                >
                                    {t('main.entities.order_status.completed')}
                                </Select.Option>
                                <Select.Option
                                    value={3}
                                    disabled={
                                        viewData.orderStatus > 3 ||
                                        viewData.orderStatus === 2 ||
                                        viewData.orderStatus === 1
                                    }
                                >
                                    {t('main.entities.order_status.cancelled')}
                                </Select.Option>
                            </Select>
                        ) : (
                            ''
                        )}

                        <Button icon={<PrinterOutlined />} onClick={() => {}} />
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Row style={{ marginBottom: 14, width: '100%' }}>
                <Col flex='auto' style={{ display: 'flex' }}>
                    {t('main.entities.dishes')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.unitPrice')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.qty')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.amount')}
                </Col>
            </Row>
            {viewData.orderDetail.map((e) => (
                <Row gutter={[8, 0]} style={{ marginBottom: 20 }}>
                    <Col flex='auto'>
                        <Row style={{ marginBottom: 4, width: '100%' }}>
                            <Col flex='auto' style={{ display: 'flex' }}>
                                {e.dishName}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CurrencyFormat value={e.unitPrice} />
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {e.qty}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}
                            >
                                <CurrencyFormat value={e.amount} />
                            </Col>
                        </Row>
                        {e.dishNote.length > 0 ? (
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
            ))}
            <Divider />
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            {t('main.entities.subtotal')}
                        </Col>
                        <Col flex={6} style={{ marginBottom: 14, display: 'inline-flex', justifyContent: 'end' }}>
                            <CurrencyFormat value={viewData.total} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            {t('main.entities.discount')}
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <NumericFormat thousandSeparator=',' displayType='text' defaultValue={0} suffix=' VND' />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            <Typography.Title level={4}>{t('main.entities.total')}</Typography.Title>
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Typography.Title level={4}>
                                <CurrencyFormat value={viewData.total} />
                            </Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const ViewBookingForm = ({ viewData, form, handleButtonCancel, handleButtonSubmit }) => {
    const { t } = useTranslation();
    return (
        <>
            <Row style={{ marginTop: 40 }}>
                <Col flex='auto'>
                    <Typography.Title level={4}>{viewData.createdAt}</Typography.Title>
                    <Typography.Text type='secondary'>
                        {t('main.entities.id')}: {viewData.id}
                    </Typography.Text>
                </Col>
                <Col span='6' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Space>
                        {EnumRender.PaymentStatus(t, viewData.paymentStatus)}
                        {viewData.orderStatus === 2 ? EnumRender.OrderStatus(t, viewData.orderStatus) : ''}
                        {viewData.orderStatus === 3 ? EnumRender.OrderStatus(t, viewData.orderStatus) : ''}
                        {viewData.orderStatus < 2 ? (
                            <Select
                                style={{
                                    width: 120,
                                }}
                                value={viewData.orderStatus}
                            >
                                <Select.Option value={0} disabled={viewData.orderStatus > 0}>
                                    {t('main.entities.order_status.ordered')}
                                </Select.Option>
                                <Select.Option value={1} disabled={viewData.orderStatus > 1}>
                                    {t('main.entities.order_status.to_receive')}
                                </Select.Option>
                                <Select.Option
                                    value={2}
                                    disabled={viewData.orderStatus > 2 || viewData.orderStatus === 0}
                                >
                                    {t('main.entities.order_status.completed')}
                                </Select.Option>
                                <Select.Option
                                    value={3}
                                    disabled={
                                        viewData.orderStatus > 3 ||
                                        viewData.orderStatus === 2 ||
                                        viewData.orderStatus === 1
                                    }
                                >
                                    {t('main.entities.order_status.cancelled')}
                                </Select.Option>
                            </Select>
                        ) : (
                            ''
                        )}

                        <Button icon={<PrinterOutlined />} onClick={() => {}} />
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Row style={{ marginBottom: 14, width: '100%' }}>
                <Col flex='auto' style={{ display: 'flex' }}>
                    {t('main.entities.dishes')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.unitPrice')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.qty')}
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'inline-flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                    }}
                >
                    {t('main.entities.amount')}
                </Col>
            </Row>
            {viewData.bookingDetail.map((e) => (
                <Row gutter={[8, 0]} style={{ marginBottom: 20 }}>
                    <Col flex='auto'>
                        <Row style={{ marginBottom: 4, width: '100%' }}>
                            <Col flex='auto' style={{ display: 'flex' }}>
                                {e.dishName}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CurrencyFormat value={e.unitPrice} />
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {e.qty}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}
                            >
                                <CurrencyFormat value={e.amount} />
                            </Col>
                        </Row>
                        {e.dishNote.length > 0 ? (
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
            ))}
            <Divider />
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            {t('main.entities.subtotal')}
                        </Col>
                        <Col flex={6} style={{ marginBottom: 14, display: 'inline-flex', justifyContent: 'end' }}>
                            <CurrencyFormat value={viewData.total} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            {t('main.entities.discount')}
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <NumericFormat thousandSeparator=',' displayType='text' defaultValue={0} suffix=' VND' />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            <Typography.Title level={4}>{t('main.entities.total')}</Typography.Title>
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Typography.Title level={4}>
                                <CurrencyFormat value={viewData.total} />
                            </Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const CreateNewAccountForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ isActive: true }}
            >
                <FormEntities.Username />
                <FormEntities.Password />
                <FormEntities.ActiveStatus />

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const EditAccountForm = ({ form, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ isActive: true }}
            >
                <FormEntities.Username />
                <FormEntities.Password />
                <FormEntities.ActiveStatus />

                <Space>
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.UpdateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

export const FormBuilder = {
    CreateNewDishForm,
    EditDishForm,
    CreateNewMenuForm,
    EditMenuForm,
    CreateNewTableForm,
    EditTableForm,
    CreateNewOrderForm,
    ViewOrderForm,
    ViewBookingForm,
    CreateNewAccountForm,
    EditAccountForm,
};
