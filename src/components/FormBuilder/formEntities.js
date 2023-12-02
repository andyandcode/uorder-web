import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    GlobalOutlined,
    LoadingOutlined,
    LockOutlined,
    PlusOutlined,
    RightOutlined,
    TagFilled,
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
import { getListRolesAdmin } from '../../pages/AccountManagement/Slice';
import { getListDishAdmin } from '../../pages/Manage/DishManagement/Slice';
import Utils from '../../utilities';
import { ButtonLocated } from '../ButtonLocated';
import { EnumRender } from '../EnumRender';

const Id = ({ data }) => {
    const { t } = useTranslation();
    const [tempId, setTempId] = useState();
    useEffect(() => {
        setTempId(data.getFieldsValue().id);
    }, [data]);
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
const IdInAccountSettings = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='id' label={t('main.entities.id')} style={{ display: 'none' }}>
                <Input disabled bordered={false} />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.id')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text>{data.getFieldsValue().id}</Typography.Text>
                </Col>
            </Row>
        </>
    );
};
const CreatedAtInAccountSettings = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='createdAt' label={t('main.entities.created_at')} style={{ display: 'none' }}>
                <Input disabled bordered={false} />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.created_at')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text>{moment(data.getFieldsValue().createdAt).format('DD/MM/YYYY')}</Typography.Text>
                </Col>
            </Row>
        </>
    );
};
const RoleInAccountSettings = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='roleId' label={t('main.entities.roles.label')} style={{ display: 'none' }}>
                <Input disabled bordered={false} />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.roles.label')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text>{EnumRender.Roles(t, data)}</Typography.Text>
                </Col>
            </Row>
        </>
    );
};
const UsernameInAccountSettings = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='username' label={t('main.entities.username')} style={{ display: 'none' }}>
                <Input disabled bordered={false} />
            </Form.Item>
            <Row style={{ marginBottom: 16 }}>
                <Col>{t('main.entities.username')}</Col>
                <Col flex={'auto'}>
                    <Typography.Text>{data.getFieldsValue().username}</Typography.Text>
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
const HiddenIdHaveInput = (data) => {
    return (
        <>
            <Form.Item name='id' style={{ display: 'none' }} initialValue={data.data}>
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
const CoverPhoto = ({ form, defaultFile }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        setImageUrl(defaultFile);
    }, [defaultFile]);

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
        const formDataImage = new FormData();
        formDataImage.append('image', info.file.originFileObj);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        setLoading(false);
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
                <Form.Item name='cover' label={t('main.entities.upload_medias')} className={'custom_input'}>
                    <Upload
                        name='image'
                        listType='picture-card'
                        className='avatar-uploader'
                        showUploadList={false}
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

const Roles = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [roleData, setRoleData] = useState([]);
    useEffect(() => {
        dispatch(getListRolesAdmin()).then((result) => {
            setRoleData(Utils.getValues(result, 'payload', []));
        });
    }, [dispatch]);
    return (
        <>
            <ConfigProvider direction='ltr'>
                <Form.Item
                    name='roleId'
                    label={t('main.entities.roles.label')}
                    rules={[
                        {
                            required: true,
                            message: t('main.entities.is_required'),
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: '150px',
                        }}
                    >
                        {roleData.map((item) => (
                            <Select.Option value={item.id} label={item.name} key={item.key}>
                                {EnumRender.Roles(t, item.name)}
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
    const [dishData, setDishData] = useState([]);
    useEffect(() => {
        setDishData(Utils.getValues(getListDishAdmin(), 'payload', []));
    }, []);
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
const OrderType = () => {
    return (
        <>
            <Form.Item name='orderType' style={{ display: 'none' }}>
                <Input />
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
                                                    name={[name, 'dishId']}
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
            <Form.Item name='orderStatus' label={t('main.entities.order_status.label')} hidden={hidden && hidden}>
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
            <Form.Item name='paymentStatus' label={t('main.entities.payment_status.label')} hidden={hidden && hidden}>
                <Select
                    style={{
                        width: 120,
                    }}
                    defaultValue={1}
                >
                    <Select.Option value={0}>{t('main.entities.payment_status.paid')}</Select.Option>
                    <Select.Option value={1}>{t('main.entities.payment_status.unpaid')}</Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};
const MoneyReceive = ({ hidden }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='moneyReceive' label={t('main.entities.money_receive')} hidden={hidden && hidden}>
                <Input />
            </Form.Item>
        </>
    );
};
const MoneyChange = ({ hidden }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='moneyChange' label={t('main.entities.money_change')} hidden={hidden && hidden}>
                <Input bordered={false} />
            </Form.Item>
        </>
    );
};
const PaymentMethod = ({ hidden }) => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item name='paymentMethod' label={t('main.entities.payment_method')} hidden={hidden && hidden}>
                <Select
                    style={{
                        width: 120,
                    }}
                    defaultValue={0}
                >
                    <Select.Option value={0}>Momo</Select.Option>
                    <Select.Option value={1}>Cash</Select.Option>
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
                <Input
                    allowClear
                    placeholder='Enter your username'
                    prefix={<UserOutlined className='site-form-item-icon' />}
                />
            </Form.Item>
        </>
    );
};
const UsernameInAdmin = () => {
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
                <Input
                    disabled
                    allowClear
                    placeholder='Enter your username'
                    prefix={<UserOutlined className='site-form-item-icon' />}
                />
            </Form.Item>
        </>
    );
};
const Password = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='password'
                label={t('main.entities.pwd')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input.Password allowClear prefix={<LockOutlined />} />
            </Form.Item>
        </>
    );
};
const OldPassword = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='oldPassword'
                label={t('main.entities.old_password')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                ]}
            >
                <Input.Password allowClear prefix={<LockOutlined />} />
            </Form.Item>
        </>
    );
};
const NewPassword = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='newPassword'
                label={t('main.entities.new_password')}
                validateFirst
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                    {
                        min: 8,
                        message: t('main.notification.auth.password_least'),
                    },
                ]}
            >
                <Input.Password allowClear prefix={<LockOutlined />} />
            </Form.Item>
        </>
    );
};
const ReNewPassword = () => {
    const { t } = useTranslation();
    return (
        <>
            <Form.Item
                name='reRewPassword'
                label={t('main.entities.re_new_password')}
                rules={[
                    {
                        required: true,
                        message: t('main.entities.is_required'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('main.notification.auth.new_re_password_not_match')));
                        },
                    }),
                ]}
                dependencies={['newPassword']}
            >
                <Input.Password allowClear prefix={<LockOutlined />} />
            </Form.Item>
        </>
    );
};
const ChefCount = ({ data, form, handleChefCountSubmitClick }) => {
    const { t } = useTranslation();
    const [disableSubmit, setDisableSubmit] = useState(true);

    const onCheckInput = (e) => {
        if (e === data.chefCount) {
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
                        name='chefCount'
                        label={t('main.entities.chef_count')}
                        tooltip={t('main.entities.chef_count_tooltip', {
                            target: t('main.common.system_key.chef_count'),
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
                            handleButton={handleChefCountSubmitClick}
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
        if (e.target.value === data.domain) {
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
const ScanRoute = () => {
    return (
        <>
            <Form.Item
                name='route'
                rules={[
                    {
                        required: true,
                    },
                ]}
                style={{ display: 'none' }}
            >
                <Input allowClear />
            </Form.Item>
        </>
    );
};

const OrderNote = ({ t }) => {
    return (
        <>
            <Form.Item name='note'>
                <Input.TextArea rows={3} placeholder={t('main.entities.order_note_placeholder')} bordered={false} />
            </Form.Item>
        </>
    );
};

const OrderTotal = ({ t, data }) => {
    return (
        <>
            <Row>
                <Col span={6} style={{ display: 'flex' }}>
                    <Typography.Text>{t('main.entities.order_total')}</Typography.Text>
                </Col>
                <Col flex={'auto'}>
                    <Form.Item name='total' initialValue={data} style={{ margin: 0 }}>
                        <NumericFormat thousandSeparator=',' displayType='text' suffix=' VND' />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

const OrderSubTotal = ({ t, data }) => {
    return (
        <>
            <Row style={{ height: 'min-content' }}>
                <Col span={6} style={{ display: 'flex' }}>
                    <Typography.Text>{t('main.entities.order_subtotal')}</Typography.Text>
                </Col>
                <Col flex={'auto'}>
                    <Form.Item name='subTotal' initialValue={data} style={{ margin: 0 }}>
                        <NumericFormat thousandSeparator=',' displayType='text' value={data} suffix=' VND' />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

const OrderDiscount = ({ t, data }) => {
    return (
        <>
            <Row style={{ height: 'min-content' }}>
                <Col span={6} style={{ display: 'flex' }}>
                    <Typography.Text>{t('main.entities.order_discount')}</Typography.Text>
                </Col>
                <Col flex={'auto'}>
                    <Form.Item initialValue={data} style={{ margin: 0 }}>
                        <NumericFormat thousandSeparator=',' displayType='text' value={data} suffix=' VND' />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

const OrderDiscountSelect = ({ t, handleSelectDiscountClick }) => {
    return (
        <>
            <Row onClick={handleSelectDiscountClick} style={{ marginTop: 12 }}>
                <Col>
                    <TagFilled style={{ width: 24, marginRight: 8, marginLeft: 6, color: '#f25022' }} />
                </Col>
                <Col>{'Save using codes'}</Col>
                <Col>
                    <Form.Item
                        name={'discount'}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input value={'asd'} style={{ display: 'none' }} />
                    </Form.Item>
                </Col>
                <Col flex={'auto'}>
                    <RightOutlined />
                </Col>
            </Row>
        </>
    );
};

const OrderPaymentMethodSelect = ({ t, handleSelectPaymentClick, paymentSelectTarget }) => {
    return (
        <>
            <Row onClick={handleSelectPaymentClick} style={{ marginTop: 12 }}>
                <Col>
                    <img alt='' src={paymentSelectTarget.icon} style={{ width: 24, marginRight: 12 }} />
                </Col>
                <Col>{paymentSelectTarget.label}</Col>
                <Col>
                    <Form.Item
                        name={'paymentMethod'}
                        style={{ margin: 0, display: 'none' }}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input value={paymentSelectTarget.value} bordered={false} />
                    </Form.Item>
                </Col>
                <Col flex={'auto'}>
                    <RightOutlined />
                </Col>
            </Row>
        </>
    );
};

const OrderItems = ({ t, data }) => {
    return (
        <>
            <Form.List name='orderDetails' initialValue={data}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <>
                                <Row style={{ marginBottom: 8 }} key={key}>
                                    <Col span={1}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'qty']}
                                            style={{
                                                margin: 0,
                                                fontWeight: 600,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <NumericFormat thousandSeparator=',' displayType='text' suffix='x' />
                                        </Form.Item>
                                    </Col>
                                    <Col flex={'auto'}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'dishId']}
                                            style={{ margin: 0, display: 'none' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <Input bordered={false} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            style={{ margin: 0 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <Input bordered={false} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'dishNote']}
                                            style={{ margin: 0 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <Input
                                                bordered={false}
                                                placeholder={t('main.entities.dish_note_placeholder')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'amount']}
                                            style={{ margin: 0 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <NumericFormat thousandSeparator=',' displayType='text' suffix=' VND' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        ))}
                    </>
                )}
            </Form.List>
        </>
    );
};
const OrderTypeInClient = () => {
    return (
        <>
            <Form.Item name='orderType' style={{ display: 'none' }}>
                <Input />
            </Form.Item>
        </>
    );
};
const OrderStatusInClient = () => {
    return (
        <>
            <Form.Item name='orderStatus' style={{ display: 'none' }} initialValue={0}>
                <Input />
            </Form.Item>
        </>
    );
};
const OrderTable = ({ data }) => {
    return (
        <>
            <Form.Item name='tableId' style={{ display: 'none' }} initialValue={0}>
                <Input />
            </Form.Item>
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
    CoverPhoto,
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
    ChefCount,
    Domain,
    ScanRoute,
    OrderType,
    PaymentMethod,
    MoneyReceive,
    MoneyChange,
    OrderItems,
    OrderNote,
    OrderTotal,
    OrderSubTotal,
    OrderDiscount,
    OrderDiscountSelect,
    OrderPaymentMethodSelect,
    OrderTypeInClient,
    OrderStatusInClient,
    OrderTable,
    Roles,
    UsernameInAdmin,
    IdInAccountSettings,
    CreatedAtInAccountSettings,
    UsernameInAccountSettings,
    RoleInAccountSettings,
    OldPassword,
    NewPassword,
    ReNewPassword,
    HiddenIdHaveInput,
};
