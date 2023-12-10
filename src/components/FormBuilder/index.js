import { CheckOutlined, CloseOutlined, CreditCardOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Divider, Form, Input, Row, Select, Space, Switch, Typography } from 'antd';
import { Divider as MobileDivider } from 'antd-mobile';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { getListDishAdmin } from '../../pages/Manage/DishManagement/Slice';
import Utils from '../../utilities';
import { ButtonLocated } from '../ButtonLocated';
import { CurrencyFormat } from '../CurrencyFormat';
import { DateType, EnumRender } from '../EnumRender';
import { SelectLanguage } from '../UseLanguages';
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
                    <Col>
                        <FormEntities.CoverPhoto form={form} />
                    </Col>
                    <Col>
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.DishType />
                        <FormEntities.ActiveStatus />
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

const EditDishForm = ({ form, handleButtonCancel, handleButtonSubmit, defaultFile }) => {
    return (
        <>
            <Form form={form} align='end' layout='horizontal' name='form_edit_in_modal'>
                <Row gutter={[52]}>
                    <Col>
                        <FormEntities.CoverPhoto defaultFile={defaultFile} form={form} />
                    </Col>
                    <Col>
                        <FormEntities.Id data={form} />
                        <FormEntities.CreatedAt data={form} />
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.DishType />
                        <FormEntities.ActiveStatus />
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
                        <FormEntities.Id data={form} />
                        <FormEntities.CreatedAt data={form} />
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
            <Form form={form} layout='horizontal' name='form_create_in_modal' align='end'>
                <FormEntities.ScanRoute />
                <FormEntities.Id data={form} />
                <FormEntities.CreatedAt data={form} />
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
    const dispatch = useDispatch();
    const [dishData, setDishData] = useState([]);
    const [disabledBtn, setDisableBtn] = useState(true);

    useEffect(() => {
        dispatch(getListDishAdmin()).then((result) => {
            setDishData(Utils.getValues(result, 'payload', []).filter((a) => (a.isActive = true)));
        });
    }, [dispatch]);

    let tempitem;
    let fieldQty;
    let fieldPrice;
    let fieldNote;
    let paymentMethod;
    let moneyReceive;
    let arr;
    let total;

    const onFormChange = (data) => {
        tempitem = dishData.find((a) => a.id === data.value);
        fieldQty = form.getFieldValue([data.name[0], data.name[1], 'qty']);
        fieldPrice = form.getFieldValue([data.name[0], data.name[1], 'unitPrice']);
        fieldNote = form.getFieldValue('note');
        paymentMethod = form.getFieldValue('paymentMethod');
        moneyReceive = form.getFieldValue('moneyReceive');
        arr = form.getFieldsValue();
        total = 0;
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
                name: 'paymentMethod',
                value: paymentMethod,
            },
            {
                name: 'moneyChange',
                value:
                    moneyReceive !== undefined
                        ? parseInt(moneyReceive.toString().replace(/[^0-9]/g, '')) - total < 0
                            ? -1
                            : parseInt(moneyReceive.toString().replace(/[^0-9]/g, '')) - total
                        : -1,
            },
            {
                name: 'moneyReceive',
                value: moneyReceive,
            },
        ]);
        setDisableBtn(form.getFieldsValue().moneyChange < 0);
    };
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{
                    orderDetails: [{ dishId: '', qty: 1, unitPrice: 0, amount: 0, dishNote: '' }],
                    orderStatus: 0,
                    paymentStatus: 0,
                    note: '',
                    tableId: '',
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
                {/* <FormEntities.PaymentStatus /> */}

                <Form.Item name='paymentMethod' initialValue={1} style={{ display: 'none' }}>
                    <Input />
                </Form.Item>

                <FormEntities.OrderType />
                <Form.Item name='note'>
                    <Input.TextArea rows={3} placeholder={t('main.entities.note')}></Input.TextArea>
                </Form.Item>
                <Form.Item name='total' initialValue={0} label={t('main.entities.total')}>
                    <NumericFormat thousandSeparator=',' displayType='text' defaultValue={0} suffix=' VND' />
                </Form.Item>
                <Form.Item name='moneyReceive' label={t('main.entities.money_receive')}>
                    <NumericFormat
                        suffix=' VND'
                        thousandSeparator=','
                        customInput={Input}
                        allowLeadingZeros={false}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return formattedValue === '' || floatValue <= 1000000000;
                        }}
                        style={{
                            width: 250,
                        }}
                    />
                </Form.Item>
                <Form.Item name='moneyChange' label={t('main.entities.money_change')}>
                    <NumericFormat thousandSeparator=',' displayType='text' suffix=' VND' />
                </Form.Item>
                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.CreateButton
                        form={form}
                        handleButton={handleButtonSubmit}
                        disabledBtn={disabledBtn}
                    />
                </Space>
            </Form>
        </>
    );
};

const PaymentStepInCreateNewOrderForm = ({ form }) => {
    return (
        <>
            <Form form={form} layout='horizontal' name='form_create_in_modal' align='end'>
                <FormEntities.PaymentMethod />
                <FormEntities.MoneyReceive />
                <FormEntities.MoneyChange />
            </Form>
        </>
    );
};

const ViewOrderForm = ({
    viewData,
    form,
    handleButtonCancel,
    handleButtonSubmit,
    handleChangeOrderStatus,
    handlePrintClick,
    handlePayBillClick,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <Row style={{ marginTop: 40 }}>
                <Col flex='auto'>
                    <Typography.Title level={4}>
                        {moment(viewData.createdAt).format('hh:mm:ss DD/MM/YYYY')}
                    </Typography.Title>
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
                                onChange={(e) => handleChangeOrderStatus(e, viewData.id)}
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
                        <Button icon={<PrinterOutlined />} onClick={handlePrintClick} />
                        <Button
                            icon={<CreditCardOutlined key='pay' />}
                            disabled={viewData.paymentStatus === 0}
                            onClick={() => handlePayBillClick(viewData)}
                        />
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
            {viewData.orderDetails.map((e) => (
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
                                <CurrencyFormat.Minimal value={e.unitPrice} />
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
            ))}
            {viewData.note != null && (
                <>
                    <Divider />
                    <Typography.Text type='secondary'>{viewData.note}</Typography.Text>
                </>
            )}
            <Divider />
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            {t('main.entities.subtotal')}
                        </Col>
                        <Col flex={6} style={{ marginBottom: 14, display: 'inline-flex', justifyContent: 'end' }}>
                            <CurrencyFormat.Minimal value={viewData.subtotal} />
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
                            <CurrencyFormat.Minimal value={viewData.discount} />
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
                                <CurrencyFormat.Minimal value={viewData.total} />
                            </Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            <Typography.Text type='secondary'>{t('main.entities.money_receive')}</Typography.Text>
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Typography.Text type='secondary'>
                                <CurrencyFormat.Minimal value={viewData.moneyReceive} />
                            </Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'} style={{ marginBottom: 14 }}></Col>
                <Col span={8} style={{}}>
                    <Row>
                        <Col flex={6} style={{ marginBottom: 14 }}>
                            <Typography.Text type='secondary'>{t('main.entities.money_change')}</Typography.Text>
                        </Col>
                        <Col
                            flex={6}
                            style={{
                                marginBottom: 14,
                                display: 'inline-flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Typography.Text type='secondary'>
                                <CurrencyFormat.Minimal value={viewData.moneyChange} />
                            </Typography.Text>
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
                                <CurrencyFormat.Minimal value={e.unitPrice} />
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
                                <CurrencyFormat.Minimal value={e.amount} />
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
                            <CurrencyFormat.Minimal value={viewData.total} />
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
                                <CurrencyFormat.Minimal value={viewData.total} />
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
                <FormEntities.Roles />
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
                <FormEntities.Id data={form} />
                <FormEntities.CreatedAt data={form} />
                <FormEntities.UsernameInAdmin />
                <FormEntities.Password />
                <FormEntities.Roles />
                <FormEntities.ActiveStatus />

                <Space>
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.UpdateButton form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const LoginForm = ({ form, t, handleButtonSubmit, loginBtnLoading }) => {
    return (
        <>
            <div style={{ width: '100%', position: 'fixed', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
                <SelectLanguage />
            </div>
            <div className='loginPage'>
                <Form form={form} layout='vertical' name='form_create_in_modal'>
                    <div style={{ display: 'flex', marginBottom: 40, flexDirection: 'column', alignItems: 'center' }}>
                        <Typography.Title>{t('main.pages.login.title')}</Typography.Title>
                        <Typography.Text>{t('main.pages.login.sub_title')}</Typography.Text>
                    </div>
                    <FormEntities.Username />
                    <FormEntities.Password />
                    <Form.Item>
                        <Button
                            type='primary'
                            block
                            onClick={() => handleButtonSubmit(form.getFieldsValue())}
                            loading={loginBtnLoading[0]}
                        >
                            {t('main.components.button.login')}
                        </Button>
                    </Form.Item>
                </Form>
                {/* <Button
                        type='link'
                        style={{
                            float: 'right',
                            marginBlockEnd: 20,
                        }}
                    >
                        {t('main.components.button.forgot_pwd')}
                    </Button> */}
            </div>
        </>
    );
};

const SystemSettingsForm = ({ t, form, data, handleDomainSubmitClick, handleChefCountSubmitClick }) => {
    return (
        <>
            <Form form={form} layout='horizontal' name='form_create_in_modal' align='end'>
                <FormEntities.HiddenId />
                <FormEntities.Domain data={data} form={form} handleDomainSubmitClick={handleDomainSubmitClick} />
            </Form>
        </>
    );
};

const AccountSettingsForm = ({ t, form, data }) => {
    return (
        <>
            <Form form={form} layout='horizontal' name='form_create_in_modal' align='end'>
                <FormEntities.IdInAccountSettings data={form} />
                <FormEntities.CreatedAtInAccountSettings data={form} />
                <FormEntities.RoleInAccountSettings data={data.data.role} />
                <FormEntities.UsernameInAccountSettings data={form} />
            </Form>
        </>
    );
};

const ChangePasswordForm = ({ form, data, handleButtonCancel, handleButtonSubmit }) => {
    return (
        <>
            <Form form={form} layout='vertical' name='form_create_in_modal' align='end'>
                <FormEntities.HiddenIdHaveInput data={data.data.id} />
                <FormEntities.OldPassword />
                <FormEntities.NewPassword />
                <FormEntities.ReNewPassword />

                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.SubmitButtom form={form} handleButton={handleButtonSubmit} />
                </Space>
            </Form>
        </>
    );
};

const OrderForm = ({
    t,
    form,
    orderData,
    handleSelectPaymentClick,
    paymentSelectTarget,
    handleSelectDiscountClick,
    handleOrderClick,
}) => {
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                style={{
                    padding: 8,
                    marginBottom: 100,
                }}
                initialValues={{ note: '', discount: 0, paymentMethod: 0, orderType: 0 }}
            >
                <FormEntities.OrderItems t={t} data={orderData.dishes} />
                <FormEntities.OrderNote t={t} />
                <FormEntities.OrderSubTotal t={t} data={orderData.subTotal} />
                <FormEntities.OrderDiscount t={t} data={orderData.discount} />
                <div className='order_bottom_nav'>
                    <FormEntities.OrderTotal t={t} data={orderData.total} />
                    <ButtonLocated.OrderButton handleOrderClick={handleOrderClick} />
                </div>
                <MobileDivider />
                <>
                    <Typography.Title level={5} style={{ textAlign: 'left' }}>
                        {t('main.pages.booking.payment_details')}
                    </Typography.Title>
                    <FormEntities.OrderPaymentMethodSelect
                        t={t}
                        handleSelectPaymentClick={handleSelectPaymentClick}
                        paymentSelectTarget={paymentSelectTarget}
                    />
                    <FormEntities.OrderTypeInClient />
                    <FormEntities.OrderStatusInClient />
                    <MobileDivider />
                    <FormEntities.OrderDiscountSelect t={t} handleSelectDiscountClick={handleSelectDiscountClick} />
                </>
            </Form>
        </>
    );
};

const PayBillForm = ({ viewData, form, handleButtonCancel, handleButtonSubmit }) => {
    const { t } = useTranslation();
    const [disabledBtn, setDisableBtn] = useState(true);

    let paymentMethod;
    let moneyReceive;
    const onFormChange = (data) => {
        moneyReceive = form.getFieldValue('moneyReceive');
        paymentMethod = form.getFieldValue('paymentMethod');
        form.setFields([
            {
                name: 'paymentMethod',
                value: paymentMethod,
            },
            {
                name: 'moneyChange',
                value:
                    moneyReceive !== undefined
                        ? parseInt(moneyReceive.toString().replace(/[^0-9]/g, '')) - viewData.total < 0
                            ? -1
                            : parseInt(moneyReceive.toString().replace(/[^0-9]/g, '')) - viewData.total
                        : -1,
            },
            {
                name: 'moneyReceive',
                value: moneyReceive,
            },
        ]);
        setDisableBtn(form.getFieldsValue().moneyChange < 0);
    };
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{
                    orderStatus: 0,
                    paymentStatus: 0,
                }}
                onFieldsChange={(data) => onFormChange(data[0])}
            >
                <Form.Item name='paymentStatus' initialValue={0} style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name='paymentMethod' initialValue={1} style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name='id' initialValue={viewData.id} label={t('main.entities.id')}>
                    <Input disabled bordered={false} style={{ display: 'none' }} />
                    {viewData.id}
                </Form.Item>

                <Form.Item name='total' initialValue={viewData.total} label={t('main.entities.total')}>
                    <NumericFormat
                        thousandSeparator=','
                        displayType='text'
                        defaultValue={viewData.total}
                        suffix=' VND'
                    />
                </Form.Item>
                <Form.Item name='moneyReceive' label={t('main.entities.money_receive')}>
                    <NumericFormat
                        suffix=' VND'
                        thousandSeparator=','
                        customInput={Input}
                        allowLeadingZeros={false}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return formattedValue === '' || floatValue <= 1000000000;
                        }}
                        style={{
                            width: 250,
                        }}
                    />
                </Form.Item>
                <Form.Item name='moneyChange' label={t('main.entities.money_change')}>
                    <NumericFormat thousandSeparator=',' displayType='text' suffix=' VND' />
                </Form.Item>
                <Space>
                    <ButtonLocated.ResetButton />
                    <ButtonLocated.CancelButton handleButton={handleButtonCancel} />
                    <ButtonLocated.SubmitButtom
                        form={form}
                        handleButton={handleButtonSubmit}
                        disabledBtn={disabledBtn}
                    />
                </Space>
            </Form>
        </>
    );
};

const CreateNewDiscountCodeForm = ({ t, form, handleButtonCancel, handleButtonSubmit }) => {
    const [usePercentage, setUsePercentage] = useState(false);
    const [appliesToAll, setAppliesToAll] = useState(true);
    return (
        <>
            <Form
                form={form}
                layout='horizontal'
                name='form_create_in_modal'
                align='end'
                initialValues={{ isActive: true, appliesToAllProducts: appliesToAll }}
            >
                <Row gutter={[52]}>
                    <Col span={12}>
                        <FormEntities.DiscountCode t={t} />
                        <FormEntities.DiscountMinOrderAmountRequired t={t} />
                        <FormEntities.DiscountExpiryDate t={t} />
                        <FormEntities.Discount t={t} required={usePercentage} />

                        <Form.Item
                            name='usePercentage'
                            valuePropName='checked'
                            label={t('main.entities.use_percentage')}
                            tooltip={t('main.entities.use_percentage_tooltip')}
                        >
                            <Switch
                                defaultChecked={usePercentage}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={(e) => setUsePercentage(e)}
                            />
                        </Form.Item>
                        <FormEntities.DiscountPercentage t={t} required={usePercentage} />
                        <FormEntities.DiscountMinDiscountAmount t={t} required={usePercentage} />
                        <FormEntities.DiscountMaxDiscountAmount t={t} required={usePercentage} />
                    </Col>
                    <Col span={12}>
                        <FormEntities.ActiveStatus />
                        <Form.Item
                            name='appliesToAllProducts'
                            valuePropName='checked'
                            label={t('main.entities.applies_to_all_products')}
                            tooltip={t('main.entities.applies_to_all_products_tooltip')}
                        >
                            <Switch
                                defaultChecked={appliesToAll}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={(e) => setAppliesToAll(e)}
                            />
                        </Form.Item>

                        <FormEntities.DiscountApplicableProductIds required={appliesToAll} />
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
const ViewDiscountCodeForm = ({ viewData, t }) => {
    const items = [
        {
            key: '1',
            label: t('main.entities.id'),
            children: viewData.id,
            span: 1,
        },
        {
            key: '2',
            label: t('main.entities.created_at'),
            children: moment(viewData.createdAt).format('hh:mm:ss DD/MM/YYYY'),
            span: 2,
        },
        {
            key: '3',
            label: t('main.entities.code'),
            children: viewData.code,
        },
        {
            key: '4',
            label: t('main.entities.start_date'),
            children: EnumRender.CalculatorTime(t, viewData.startDate, DateType.StartDateKey),
        },
        {
            key: '5',
            label: t('main.entities.end_date'),
            children: EnumRender.CalculatorTime(t, viewData.endDate, DateType.EndDateKey),
        },
        {
            key: '6',
            label: t('main.entities.active_status.label'),
            children: EnumRender.ActiveStatus(t, viewData.isActive),
            span: 3,
        },
        {
            key: '7',
            label: t('main.entities.discount'),
            children:
                viewData.discount > 0 ? (
                    <CurrencyFormat.Minimal value={viewData.discount} />
                ) : (
                    <Typography.Text type='secondary'>{t('main.entities.do_not_apply')}</Typography.Text>
                ),
        },
        {
            key: '8',
            label: t('main.entities.min_order_amount_required'),
            children:
                viewData.minOrderAmountRequired > 0 ? (
                    <CurrencyFormat.Minimal value={viewData.minOrderAmountRequired} />
                ) : (
                    <Typography.Text type='secondary'>{t('main.entities.do_not_apply')}</Typography.Text>
                ),
            span: 2,
        },
        {
            key: '9',
            label: t('main.entities.percentage'),
            children:
                viewData.percentage > 0 ? (
                    `${viewData.percentage}%`
                ) : (
                    <Typography.Text type='secondary'>{t('main.entities.do_not_apply')}</Typography.Text>
                ),
        },
        {
            key: '10',
            label: t('main.entities.min_discount_amount'),
            children:
                viewData.minDiscountAmount > 0 ? (
                    <CurrencyFormat.Minimal value={viewData.minDiscountAmount} />
                ) : (
                    <Typography.Text type='secondary'>{t('main.entities.do_not_apply')}</Typography.Text>
                ),
        },
        {
            key: '11',
            label: t('main.entities.max_discount_amount'),
            children:
                viewData.maxDiscountAmount > 0 ? (
                    <CurrencyFormat.Minimal value={viewData.maxDiscountAmount} />
                ) : (
                    <Typography.Text type='secondary'>{t('main.entities.do_not_apply')}</Typography.Text>
                ),
        },
        {
            key: '12',
            label: t('main.entities.applies_to_products'),
            children: viewData.appliesToAllProducts
                ? t('main.entities.applies_to_all_products')
                : viewData.applicableProductIds.map((i) => (
                      <>
                          {i.name}
                          <br />
                      </>
                  )),
        },
    ];
    return (
        <>
            <Descriptions title='' bordered items={items} />
            {/* <Row style={{ marginTop: 20 }}>
                <Col flex='auto'>
                    <Typography.Title level={4}>
                        {moment(viewData.createdAt).format('hh:mm:ss DD/MM/YYYY')}
                    </Typography.Title>
                    <Typography.Text type='secondary'>
                        {t('main.entities.id')}: {viewData.id}
                    </Typography.Text>
                </Col>
                <Col flex='auto' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography.Title level={4}>{viewData.code}</Typography.Title>
                    <Typography.Text type='secondary'>{EnumRender.ActiveStatus(t, viewData.isActive)}</Typography.Text>
                </Col>
            </Row>
            {viewData.startDate && (
                <Typography.Title level={5}>
                    {moment(viewData.startDate).format('DD/MM/YYYY')} - {moment(viewData.enđate).format('DD/MM/YYYY')}
                </Typography.Title>
            )}

            {viewData.discount > 0 && (
                <Typography.Text type='' style={{ width: '100%' }}>
                    {t('main.entities.discount')}: {<CurrencyFormat.Minimal value={viewData.discount} />}
                </Typography.Text>
            )}
            {viewData.percentage > 0 && (
                <>
                    <Space direction='vertical' style={{ width: '100%' }}>
                        <Typography.Text type=''>
                            {t('main.entities.percentage')}: {viewData.percentage}%
                        </Typography.Text>
                        <Typography.Text type=''>
                            {t('main.entities.min_discount_amount')}:{' '}
                            {<CurrencyFormat.Minimal value={viewData.minDiscountAmount} />}
                        </Typography.Text>
                        <Typography.Text type=''>
                            {t('main.entities.max_discount_amount')}:{' '}
                            {<CurrencyFormat.Minimal value={viewData.maxDiscountAmount} />}
                        </Typography.Text>
                    </Space>
                </>
            )}
            {viewData.appliesToAllProducts && (
                <>
                    <Typography.Text type=''>{t('main.entities.applies_to_all_products')}</Typography.Text>
                </>
            )}
            {viewData.applicableProductIds !== null && (
                <>
                    <Typography.Text type=''>
                        {t('main.entities.applies_to_products')}:{' '}
                        {viewData.applicableProductIds.map((i) => (
                            <span>{i.name},</span>
                        ))}
                    </Typography.Text>
                </>
            )} */}
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
    LoginForm,
    SystemSettingsForm,
    PaymentStepInCreateNewOrderForm,
    OrderForm,
    AccountSettingsForm,
    ChangePasswordForm,
    PayBillForm,
    CreateNewDiscountCodeForm,
    ViewDiscountCodeForm,
};
