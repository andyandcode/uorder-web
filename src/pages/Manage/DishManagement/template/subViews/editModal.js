import { CheckOutlined, CloseOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Col, ConfigProvider, Form, Input, Modal, Row, Select, Space, Switch } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import moment from 'moment/moment';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const { TextArea } = Input;
const { Option } = Select;

export default function EditModal(props) {
    const {
        t,
        editForm,
        openEditModel,
        handleEditSubmitClick,
        handleEditCancelClick,
        messageContextHolder,
        draggerFileProps,
        defaultFileList,
    } = props;

    return (
        <>
            <Modal
                open={openEditModel}
                title={t('app.feature.manage.dish.editForm.title')}
                okText={t('app.feature.manage.dish.editForm.create')}
                cancelText={t('app.feature.manage.dish.editForm.cancel')}
                onCancel={handleEditCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='auto'
            >
                {messageContextHolder}
                <Form form={editForm} align='end' layout='horizontal' name='form_edit_in_modal'>
                    <Row gutter={[52]}>
                        <Col span={12}>
                            <ConfigProvider direction='rtl'>
                                <Form.Item
                                    name='id'
                                    label={t('app.feature.manage.dish.editForm.id')}
                                    tooltip={t('app.feature.manage.dish.editForm.idTooltip')}
                                >
                                    <Input disabled bordered={false} />
                                </Form.Item>
                                <Form.Item
                                    name='createdAt'
                                    label={t('app.feature.manage.dish.editForm.createdAt')}
                                    tooltip={t('app.feature.manage.dish.editForm.createdAtTooltip')}
                                >
                                    <Input
                                        disabled
                                        bordered={false}
                                        value={moment().format('DD/MM/YYYY')}
                                    />
                                </Form.Item>
                            </ConfigProvider>
                            <Form.Item
                                name='name'
                                label={t('app.feature.manage.dish.editForm.name')}
                                tooltip={t('app.feature.manage.dish.editForm.nameTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.editForm.nameIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <Input
                                    allowClear
                                    style={{
                                        width: 395,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='desc'
                                label={t('app.feature.manage.dish.editForm.desc')}
                                tooltip={t('app.feature.manage.dish.editForm.descTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.editForm.descIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <TextArea allowClear rows={4} />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                label={t('app.feature.manage.dish.editForm.price')}
                                tooltip={t('app.feature.manage.dish.editForm.priceTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.editForm.priceIsRequired',
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
                                        return formattedValue === '' || floatValue <= 1000000000;
                                    }}
                                    style={{
                                        width: 200,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='completionTime'
                                label={t('app.feature.manage.dish.editForm.completionTime')}
                                tooltip={t(
                                    'app.feature.manage.dish.editForm.completionTimeTooltip',
                                )}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.editForm.completionTimeIsRequired',
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
                                        return formattedValue === '' || floatValue <= 1000000000;
                                    }}
                                    style={{
                                        width: 200,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='qtyPerDate'
                                label={t('app.feature.manage.dish.editForm.qtyPerDate')}
                                tooltip={t('app.feature.manage.dish.editForm.qtyPerDateTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.dish.editForm.qtyPerDateIsRequired',
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
                                        return formattedValue === '' || floatValue <= 1000000000;
                                    }}
                                    style={{
                                        width: 200,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='type'
                                shouldUpdate
                                label={t('app.feature.manage.dish.editForm.type')}
                                tooltip={t('app.feature.manage.dish.editForm.typeTooltip')}
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
                                label={t('app.feature.manage.dish.editForm.isActive')}
                                tooltip={t('app.feature.manage.dish.editForm.isActiveTooltip')}
                                valuePropName='checked'
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <ConfigProvider direction='ltr'>
                                <Form.Item
                                    name='medias'
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
                                        <Dragger
                                            {...draggerFileProps}
                                            defaultFileList={defaultFileList}
                                        >
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
                        <Button danger htmlType='reset' onClick={handleEditCancelClick}>
                            {t('app.feature.manage.dish.editForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleEditSubmitClick(editForm.getFieldsValue())}
                            form={editForm}
                            type='primary'
                        >
                            {t('app.feature.manage.dish.editForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
