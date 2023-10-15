import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Modal, Space, Switch } from 'antd';
import moment from 'moment/moment';
import React from 'react';

const { TextArea } = Input;

export default function EditModal(props) {
    const {
        t,
        editForm,
        openEditModel,
        handleEditSubmitClick,
        handleEditCancelClick,
        messageContextHolder,
    } = props;

    return (
        <>
            <Modal
                open={openEditModel}
                title={t('app.feature.manage.table.editForm.title')}
                okText={t('app.feature.manage.table.editForm.create')}
                cancelText={t('app.feature.manage.table.editForm.cancel')}
                onCancel={handleEditCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='50%'
            >
                {messageContextHolder}
                <Form form={editForm} align='end' layout='horizontal' name='form_edit_in_modal'>
                    <ConfigProvider direction='rtl'>
                        <Form.Item
                            name='id'
                            label={t('app.feature.manage.table.editForm.id')}
                            tooltip={t('app.feature.manage.table.editForm.idTooltip')}
                        >
                            <Input disabled bordered={false} />
                        </Form.Item>
                        <Form.Item
                            name='createdAt'
                            label={t('app.feature.manage.table.editForm.createdAt')}
                            tooltip={t('app.feature.manage.table.editForm.createdAtTooltip')}
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
                        label={t('app.feature.manage.table.editForm.name')}
                        tooltip={t('app.feature.manage.table.editForm.nameTooltip')}
                        rules={[
                            {
                                required: true,
                                message: t('app.feature.manage.table.editForm.nameIsRequired'),
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        name='desc'
                        label={t('app.feature.manage.table.editForm.desc')}
                        tooltip={t('app.feature.manage.table.editForm.descTooltip')}
                        rules={[
                            {
                                required: true,
                                message: t('app.feature.manage.table.editForm.descIsRequired'),
                            },
                        ]}
                    >
                        <TextArea allowClear rows={4} />
                    </Form.Item>
                    <Form.Item
                        name='isActive'
                        label={t('app.feature.manage.table.editForm.isActive')}
                        tooltip={t('app.feature.manage.table.editForm.isActiveTooltip')}
                        valuePropName='checked'
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Space>
                        <Button danger htmlType='reset' onClick={handleEditCancelClick}>
                            {t('app.feature.manage.table.editForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleEditSubmitClick(editForm.getFieldsValue())}
                            form={editForm}
                            type='primary'
                        >
                            {t('app.feature.manage.table.editForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
