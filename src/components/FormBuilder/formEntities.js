import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    GlobalOutlined,
    LoadingOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
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
import { useDispatch } from 'react-redux';
import DishData from '../../database/dish.json';
import { getListDishAdmin } from '../../pages/Manage/DishManagement/Slice';
import Utils from '../../utilities';
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
const HiddenId = () => {
    return (
        <>
            <Form.Item name='id' style={{ display: 'none' }}>
                <Input />
            </Form.Item>
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
                        return formattedValue === '' || floatValue <= 1000000000;
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
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <ConfigProvider direction='ltr'>
                <Form.Item name='medias' label={t('main.entities.upload_medias')} className={'custom_input'}>
                    <Upload
                        name='medias'
                        listType='picture-card'
                        className='avatar-uploader'
                        showUploadList={false}
                        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt='avatar'
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
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
    const dispatch = useDispatch();
    const [dishData, setDishData] = useState([]);
    useEffect(() => {
        dispatch(getListDishAdmin()).then((result) => {
            setDishData(Utils.getValues(result, 'payload', []));
        });
    }, [dispatch]);

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

const ChiefCount = ({ data, form, handleChiefCountSubmitClick }) => {
    const { t } = useTranslation();
    const [disableSubmit, setDisableSubmit] = useState(true);

    const onCheckInput = (e) => {
        if (e === data) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    };
    return (
        <>
            <Row>
                <Col flex={'auto'}>
                    <Form.Item
                        name='chiefCount'
                        label={t('main.entities.chief_count')}
                        tooltip={t('main.entities.chief_count_tooltip', {
                            target: t('main.common.system_key.chief_count'),
                        })}
                        rules={[
                            {
                                required: true,
                                message: t('main.entities.is_required'),
                            },
                        ]}
                    >
                        <InputNumber
                            addonBefore={<UserOutlined />}
                            min={1}
                            keyboard={true}
                            onChange={(e) => onCheckInput(e)}
                        />
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Space>
                        <ButtonLocated.SubmitSystemSettingsButtom
                            disabled={disableSubmit}
                            handleButton={handleChiefCountSubmitClick}
                            form={form}
                        />
                    </Space>
                </Col>
            </Row>
        </>
    );
};
const Domain = ({ data, form, handleDomainSubmitClick }) => {
    const { t } = useTranslation();
    const [disableSubmit, setDisableSubmit] = useState(true);

    const onCheckInput = (e) => {
        if (e.target.value === data) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    };

    return (
        <>
            <Row>
                <Col flex={'auto'}>
                    <Form.Item
                        name='domain'
                        label={t('main.entities.domain')}
                        tooltip={t('main.entities.domain_tooltip', {
                            target: t('main.common.system_key.domain'),
                        })}
                        rules={[
                            {
                                required: true,
                                message: t('main.entities.is_required'),
                            },
                        ]}
                    >
                        <Input addonBefore={<GlobalOutlined />} allowClear onChange={(e) => onCheckInput(e)} />
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Space>
                        <ButtonLocated.SubmitSystemSettingsButtom
                            disabled={disableSubmit}
                            handleButton={handleDomainSubmitClick}
                            form={form}
                        />
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const FormEntities = {
    Id,
    HiddenId,
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
    ChiefCount,
    Domain,
};
