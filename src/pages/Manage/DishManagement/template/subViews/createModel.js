import { CheckOutlined, CloseOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Switch,
    Upload,
} from 'antd';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

export default function CreateModel(props) {
    const {
        t,
        createForm,
        openCreateModel,
        handleCreateCancelClick,
        handleCreateSubmitClick,
        messageContextHolder,
        draggerFileProps,
    } = props;

    return (
        <>
            <Modal
                open={openCreateModel}
                title={t('app.feature.manage.dish.createForm.title')}
                okText={t('app.feature.manage.dish.createForm.create')}
                cancelText={t('app.feature.manage.dish.createForm.cancel')}
                onCancel={handleCreateCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='auto'
            >
                {messageContextHolder}
                <Form
                    form={createForm}
                    layout='horizontal'
                    name='form_create_in_modal'
                    align='end'
                    initialValues={{ type: 0, isActive: true }}
                >
                    <Row gutter={[52]}>
                        <Col span={12}>
                            <Form.Item
                                name='name'
                                label={t('app.feature.manage.dish.createForm.name')}
                                tooltip={t('app.feature.manage.dish.createForm.nameTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.createForm.nameIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name='desc'
                                label={t('app.feature.manage.dish.createForm.desc')}
                                tooltip={t('app.feature.manage.dish.createForm.descTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.createForm.descIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <TextArea allowClear rows={4} />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                label={t('app.feature.manage.dish.createForm.price')}
                                tooltip={t('app.feature.manage.dish.createForm.priceTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.createForm.priceIsRequired',
                                        ),
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
                                        return (
                                            formattedValue === '' ||
                                            (floatValue <= 1000000000 && floatValue >= 1)
                                        );
                                    }}
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='completionTime'
                                label={t('app.feature.manage.dish.createForm.completionTime')}
                                tooltip={t(
                                    'app.feature.manage.dish.createForm.completionTimeTooltip',
                                )}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.createForm.completionTimeIsRequired',
                                        ),
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
                                        return (
                                            formattedValue === '' ||
                                            (floatValue <= 1000 && floatValue >= 1)
                                        );
                                    }}
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='qtyPerDate'
                                label={t('app.feature.manage.dish.createForm.qtyPerDate')}
                                tooltip={t('app.feature.manage.dish.createForm.qtyPerDateTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.createForm.qtyPerDateIsRequired',
                                        ),
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
                                        return (
                                            formattedValue === '' ||
                                            (floatValue <= 1000000000 && floatValue >= 1)
                                        );
                                    }}
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='type'
                                label={t('app.feature.manage.dish.createForm.type')}
                                tooltip={t('app.feature.manage.dish.createForm.typeTooltip')}
                            >
                                <Select
                                    bordered={false}
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    <Option value={0}>
                                        {t('app.feature.table.dishManagement.typeName.food')}
                                    </Option>
                                    <Option value={1}>
                                        {t('app.feature.table.dishManagement.typeName.drink')}
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name='isActive'
                                label={t('app.feature.manage.dish.createForm.isActive')}
                                tooltip={t('app.feature.manage.dish.createForm.isActiveTooltip')}
                                valuePropName='checked'
                            >
                                <Switch
                                    defaultChecked
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <ConfigProvider direction='ltr'>
                                <Form.Item
                                    name='files'
                                    label={t('app.feature.manage.dish.createForm.upload')}
                                    valuePropName='fileList'
                                    className={'custom_input'}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                'app.feature.manage.dish.createForm.uploadIsRequired',
                                            ),
                                        },
                                    ]}
                                >
                                    <Space>
                                        <Dragger {...draggerFileProps}>
                                            <p className='ant-upload-drag-icon'>
                                                <InboxOutlined />
                                            </p>
                                            <p className='ant-upload-text'>
                                                {t('app.utilities.upload.text')}
                                            </p>
                                            <p className='ant-upload-hint'>
                                                {t('app.utilities.upload.hint')}
                                            </p>
                                        </Dragger>
                                    </Space>
                                </Form.Item>
                            </ConfigProvider>
                        </Col>
                    </Row>

                    <Space>
                        <Button type='text' htmlType='reset'>
                            {t('app.feature.manage.dish.createForm.resetButton')}
                        </Button>
                        <Button danger onClick={handleCreateCancelClick}>
                            {t('app.feature.manage.dish.createForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleCreateSubmitClick(createForm.getFieldsValue())}
                            form={createForm}
                            type='primary'
                        >
                            {t('app.feature.manage.dish.createForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
