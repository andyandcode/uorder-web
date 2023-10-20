import { Col, Form, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import DishData from '../../database/dish.json';
import { ButtonLocated } from '../ButtonLocated';
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

export const FormBuilder = {
    CreateNewDishForm,
    EditDishForm,
    CreateNewMenuForm,
    EditMenuForm,
    CreateNewTableForm,
    EditTableForm,
    CreateNewOrderForm,
};
