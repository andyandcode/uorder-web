import { CheckOutlined, CloseOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Switch,
    Typography,
    Upload,
    message,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import DishData from '../../database/dish.json';
import { ButtonLocated } from '../ButtonLocated';
import { EnumRender } from '../EnumRender';

const Id = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='id'
                label={t('main.entities.id')}
                tooltip={
                    (t('main.entities.id_tooltip'),
                    {
                        target: t('main.common.system_key.dish'),
                    })
                }
                style={{ display: 'none' }}
            >
                <Input disabled bordered={false} />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.id')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text type='secondary'>{data.getFieldsValue().id}</Typography.Text>
                </Col>
            </Row>
        </>
    );
};
const CreatedAt = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='createdAt'
                label={t('main.entities.created_at')}
                tooltip={
                    (t('main.entities.created_at_tooltip'),
                    {
                        target: t('main.common.system_key.dish'),
                    })
                }
                style={{ display: 'none' }}
            >
                <Input />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.created_at')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text type='secondary'>
                        {moment(data.getFieldsValue().createdAt).format('DD/MM/YYYY')}
                    </Typography.Text>
                </Col>
            </Row>
        </>
    );
};
const Name = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='name'
                label={t('main.entities.name')}
                tooltip={t('main.entities.name_tooltip', {
                    target: t('main.common.system_key.dish'),
                })}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input allowClear />
            </Form.Item>
        </>
    );
};
const Desc = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='desc'
                label={t('main.entities.desc')}
                tooltip={t('main.entities.desc_tooltip', {
                    target: t('main.common.system_key.dish'),
                })}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input.TextArea allowClear rows={4} />
            </Form.Item>
        </>
    );
};
const Price = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='price'
                label={t('main.entities.price')}
                tooltip={t('main.entities.price_tooltip')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <NumericFormat
                    allowClear
                    suffix=' VND'
                    thousandSeparator=','
                    customInput={Input}
                    allowLeadingZeros={false}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === '' || (floatValue <= 1000000000 && floatValue >= 1);
                    }}
                    style={{
                        width: 250,
                    }}
                />
            </Form.Item>
        </>
    );
};
const CompletionTime = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='completionTime'
                label={t('main.entities.completion_time')}
                tooltip={t('main.entities.completion_time_tooltip')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <NumericFormat
                    allowClear
                    thousandSeparator=','
                    customInput={Input}
                    allowLeadingZeros={false}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === '' || (floatValue <= 1000 && floatValue >= 1);
                    }}
                    style={{
                        width: 250,
                    }}
                />
            </Form.Item>
        </>
    );
};
const UploadMedias = ({ defaultFileList }) => {
    const { t } = useTranslation();
    const draggerFileProps = {
        name: 'file',
        multiple: true,
        maxCount: 8,
        accept: 'image/png, image/jpeg',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <ConfigProvider direction='ltr'>
                <Form.Item
                    name='medias'
                    label={t('main.entities.upload_medias')}
                    valuePropName='fileList'
                    className={'custom_input'}
                    rules={[
                        {
                            required: true,
                            message: t('main.entities.upload_medias_is_required'),
                        },
                    ]}
                    initialValue={{ medias: defaultFileList }}
                >
                    <Space>
                        <Upload.Dragger {...draggerFileProps} defaultFileList={[]}>
                            <p className='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>{t('main.components.antd_dragger.text')}</p>
                            <p className='ant-upload-hint'>{t('main.components.antd_dragger.hint')}</p>
                        </Upload.Dragger>
                    </Space>
                </Form.Item>
            </ConfigProvider>
        </>
    );
};
const QtyPerDay = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='qtyPerDay'
                label={t('main.entities.qty_per_day')}
                tooltip={t('main.entities.qty_per_day_tooltip')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <NumericFormat
                    min={1000}
                    allowClear
                    thousandSeparator=','
                    customInput={Input}
                    allowLeadingZeros={false}
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === '' || (floatValue <= 1000000000 && floatValue >= 1);
                    }}
                    style={{
                        width: 250,
                    }}
                />
            </Form.Item>
        </>
    );
};
const Table = () => {
    const { t } = useTranslation();
    return <></>;
};
const Dishes = () => {
    const { t } = useTranslation();
    const data = DishData;
    const [dishData, setDishData] = useState([]);
    useEffect(() => {
        setDishData(data);
    }, [data]);
    return (
        <>
            <ConfigProvider direction='ltr'>
                <Form.Item name='dishes' label={t('main.entities.dishes')} className={'custom_select_in_menu'}>
                    <Select
                        mode='multiple'
                        style={{
                            width: '100%',
                        }}
                        onChange={() => {}}
                        optionLabelProp='label'
                    >
                        {dishData.map((item) => (
                            <Select.Option value={item.id} label={item.name} key={item.key}>
                                <Space>
                                    {EnumRender.DishTypeWithActievStatus(t, item.type, item.isActive)}
                                    {item.name}
                                </Space>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </ConfigProvider>
        </>
    );
};

const DishesInOrder = () => {
    const { t } = useTranslation();
    const data = DishData;
    const [dishData, setDishData] = useState([]);
    useEffect(() => {
        setDishData(data.filter((a) => (a.isActive = true)));
    }, [data]);
    return (
        <>
            <Form.Item name='dishes'>
                <Select
                    style={{
                        width: '400px',
                    }}
                    onChange={() => {}}
                    optionLabelProp='label'
                >
                    {dishData.map((item) => (
                        <Select.Option value={item.id} label={item.name} key={item.key}>
                            <Space>
                                {EnumRender.DishTypeWithActievStatus(t, item.type, item.isActive)}
                                {item.name}
                            </Space>
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

const ActiveStatus = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='isActive' valuePropName='checked' label={t('main.entities.active_status.label')}>
                <Switch defaultChecked checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
        </>
    );
};

const DishType = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='type' label={t('main.entities.dish_type.label')}>
                <Select
                    bordered={false}
                    style={{
                        width: 120,
                    }}
                >
                    <Select.Option value={0}>{t('main.entities.dish_type.food')}</Select.Option>
                    <Select.Option value={1}>{t('main.entities.dish_type.drink')}</Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};

const OrderDishItem = ({ dishData }) => {
    const { t } = useTranslation();

    return (
        <>
            <Form.List name='orderDetails'>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <>
                                <Row gutter={[8, 0]} style={{ marginBottom: 20 }}>
                                    <Col flex='auto'>
                                        <Row gutter={[8, 0]} style={{ marginBottom: 0 }}>
                                            <Col flex='auto' style={{ display: 'flex' }}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'dish']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('main.entities.is_required'),
                                                        },
                                                    ]}
                                                    style={{ display: 'flex', width: '100%' }}
                                                    className='custom_fullwidth_formItem'
                                                >
                                                    <Select
                                                        style={{ display: 'inline-flex', width: '' }}
                                                        optionLabelProp='label'
                                                    >
                                                        {dishData.map((item) => (
                                                            <Select.Option
                                                                value={item.id}
                                                                label={item.name}
                                                                key={item.key}
                                                            >
                                                                <Space>
                                                                    {EnumRender.DishTypeWithActievStatus(
                                                                        t,
                                                                        item.type,
                                                                        item.isActive,
                                                                    )}
                                                                    {item.name}
                                                                </Space>
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4} style={{ display: 'flex' }}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'qty']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber min={1} max={100} keyboard={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4} style={{}}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'unitPrice']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '',
                                                        },
                                                    ]}
                                                >
                                                    <NumericFormat
                                                        thousandSeparator=','
                                                        displayType='text'
                                                        defaultValue={0}
                                                        suffix=' VND'
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4} style={{}}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'amount']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '',
                                                        },
                                                    ]}
                                                >
                                                    <NumericFormat
                                                        thousandSeparator=','
                                                        displayType='text'
                                                        defaultValue={0}
                                                        suffix=' VND'
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col flex='auto' style={{ display: 'flex' }}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'dishNote']}
                                                    style={{ display: 'flex', width: '100%' }}
                                                    className='custom_fullwidth_formItem'
                                                >
                                                    <Input placeholder={t('main.entities.dishNote')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={3}>
                                        <Button
                                            type='text'
                                            danger
                                            disabled={fields.length > 1 ? false : true}
                                            icon={<DeleteOutlined className='dynamic-delete-button' />}
                                            onClick={() => remove(name)}
                                            style={{ height: '100%' }}
                                        >
                                            {t('main.components.button.remove_order_item')}
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        ))}
                        <Form.Item>
                            <ButtonLocated.AddOrderItem handleButton={() => add()} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );
};

const OrderStatus = ({ hidden }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='order_status' label={t('main.entities.order_status.label')} hidden={hidden && hidden}>
                <Select
                    style={{
                        width: 120,
                    }}
                    defaultValue={0}
                >
                    <Select.Option value={0}>{t('main.entities.order_status.ordered')}</Select.Option>
                    <Select.Option value={1}>{t('main.entities.order_status.to_receive')}</Select.Option>
                    <Select.Option value={2}>{t('main.entities.order_status.completed')}</Select.Option>
                    <Select.Option value={3}>{t('main.entities.order_status.cancelled')}</Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};

const PaymentStatus = ({ hidden }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='payment_status' label={t('main.entities.payment_status.label')} hidden={hidden && hidden}>
                <Select
                    style={{
                        width: 120,
                    }}
                    defaultValue={0}
                >
                    <Select.Option value={0}>{t('main.entities.payment_status.paid')}</Select.Option>
                    <Select.Option value={1}>{t('main.entities.payment_status.unpaid')}</Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};

const Username = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='username'
                label={t('main.entities.username')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input allowClear />
            </Form.Item>
        </>
    );
};

const Password = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='pwd'
                label={t('main.entities.pwd')}
                tooltip={t('main.entities.pwd_tooltip', {
                    target: t('main.common.system_key.dish'),
                })}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input allowClear />
            </Form.Item>
        </>
    );
};

export const FormEntities = {
    Id,
    CreatedAt,
    Name,
    Desc,
    Price,
    CompletionTime,
    UploadMedias,
    QtyPerDay,
    Table,
    Dishes,
    ActiveStatus,
    DishType,
    OrderDishItem,
    DishesInOrder,
    OrderStatus,
    PaymentStatus,
    Username,
    Password,
};
