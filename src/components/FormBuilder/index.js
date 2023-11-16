import { LockOutlined, PrinterOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Button, Col, Divider, Form, Input, Row, Select, Space, Typography, theme } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { getListDishAdmin } from '../../pages/Manage/DishManagement/Slice';
import Utils from '../../utilities';
import { ButtonLocated } from '../ButtonLocated';
import { CurrencyFormat } from '../CurrencyFormat';
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
                    <Col>
                        <FormEntities.UploadMedias />
                    </Col>
                    <Col>
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.CompletionTime />
                        <FormEntities.QtyPerDay />
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

const EditDishForm = ({ form, handleButtonCancel, handleButtonSubmit, defaultFileList }) => {
    return (
        <>
            <Form form={form} align='end' layout='horizontal' name='form_edit_in_modal'>
                <Row gutter={[52]}>
                    <Col>
                        <FormEntities.UploadMedias defaultFileList={defaultFileList} />
                    </Col>
                    <Col>
                        <FormEntities.Id data={form} />
                        <FormEntities.CreatedAt data={form} />
                        <FormEntities.Name />
                        <FormEntities.Desc />
                        <FormEntities.Price />
                        <FormEntities.CompletionTime />
                        <FormEntities.QtyPerDay />
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

    useEffect(() => {
        dispatch(getListDishAdmin()).then((result) => {
            setDishData(Utils.getValues(result, 'payload', []).filter((a) => (a.isActive = true)));
        });
    }, [dispatch]);

    let tempitem;
    let fieldQty;
    let fieldPrice;
    let fieldNote;
    let fieldOrderStatus;
    let fieldPaymentStatus;
    let arr;
    let total;

    const onFormChange = (data) => {
        tempitem = dishData.find((a) => a.id === data.value);
        fieldQty = form.getFieldValue([data.name[0], data.name[1], 'qty']);
        fieldPrice = form.getFieldValue([data.name[0], data.name[1], 'unitPrice']);
        fieldNote = form.getFieldValue('note');
        fieldOrderStatus = form.getFieldValue('orderStatus');
        fieldPaymentStatus = form.getFieldValue('paymentStatus');
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
                name: 'orderStatus',
                value: fieldOrderStatus,
            },
            {
                name: 'paymentStatus',
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
                <FormEntities.PaymentStatus />

                {/* <FormEntities.PaymentMethod />
                <FormEntities.MoneyReceive />
                <FormEntities.MoneyChange /> */}

                <FormEntities.OrderType />
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

const LoginForm = ({ t, handleButtonSubmit }) => {
    const { token } = theme.useToken();
    return (
        <>
            <div
                style={{
                    backgroundColor: 'white',
                    height: '100vh',
                }}
            >
                <LoginFormPage
                    backgroundImageUrl='https://media.licdn.com/dms/image/C4D12AQHTBV0aw2Yqbw/article-cover_image-shrink_720_1280/0/1634637189100?e=2147483647&v=beta&t=xDJKaAHDoXd14IXAx7RTndH4GjdcAtH8OnGLU1qwMjI'
                    title={t('main.pages.login.title')}
                    containerStyle={{
                        backgroundColor: 'rgba(255, 255, 255,0.55)',
                        backdropFilter: 'blur(4px)',
                    }}
                    subTitle={t('main.pages.login.sub_title')}
                    submitter={{
                        render: (props, doms) => {
                            return [
                                <Button
                                    type='primary'
                                    block
                                    onClick={(e) => handleButtonSubmit(props.form.getFieldsValue())}
                                >
                                    {t('main.components.button.login')}
                                </Button>,
                            ];
                        },
                    }}
                >
                    <ProFormText
                        name='username'
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <UserOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={t('main.entities.username')}
                        rules={[
                            {
                                required: true,
                                message: t('main.entities.is_required'),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name='password'
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <LockOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={t('main.entities.pwd')}
                        rules={[
                            {
                                required: true,
                                message: t('main.entities.is_required'),
                            },
                        ]}
                    />
                    <Button
                        type='link'
                        style={{
                            float: 'right',
                            marginBlockEnd: 20,
                        }}
                    >
                        {t('main.components.button.forgot_pwd')}
                    </Button>
                </LoginFormPage>
            </div>
        </>
    );
};

const SystemSettingsForm = ({ t, form, data, handleDomainSubmitClick, handleChefCountSubmitClick }) => {
    return (
        <>
            <Form form={form} layout='horizontal' name='form_create_in_modal' align='end'>
                <FormEntities.HiddenId />
                <FormEntities.ChefCount
                    data={data}
                    form={form}
                    handleChefCountSubmitClick={handleChefCountSubmitClick}
                />
                <FormEntities.Domain data={data} form={form} handleDomainSubmitClick={handleDomainSubmitClick} />
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
                <FormEntities.OrderItems t={t} data={orderData.results} />
                <FormEntities.OrderNote t={t} />
                <FormEntities.OrderSubTotal t={t} data={orderData.total} />
                <FormEntities.OrderDiscount t={t} data={0} />
                <div className='order_bottom_nav'>
                    <FormEntities.OrderTotal t={t} data={orderData.total} />
                    <ButtonLocated.OrderButton handleOrderClick={handleOrderClick} />
                </div>
                <Divider />
                <>
                    <Typography.Title level={5} style={{ textAlign: 'left' }}>
                        {t('main.pages.order.payment_details')}
                    </Typography.Title>
                    <FormEntities.OrderPaymentMethodSelect
                        t={t}
                        handleSelectPaymentClick={handleSelectPaymentClick}
                        paymentSelectTarget={paymentSelectTarget}
                    />
                    <FormEntities.OrderTypeInClient />
                    <FormEntities.OrderStatusInClient />
                    <Divider style={{ margin: '1px 0' }} />
                    <FormEntities.OrderDiscountSelect t={t} handleSelectDiscountClick={handleSelectDiscountClick} />
                </>
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
    LoginForm,
    SystemSettingsForm,
    PaymentStepInCreateNewOrderForm,
    OrderForm,
};
