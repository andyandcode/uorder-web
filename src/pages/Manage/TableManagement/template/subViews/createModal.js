import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Switch } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default function CreateModal(props) {
    const {
        t,
        createForm,
        openCreateModel,
        handleCreateCancelClick,
        handleCreateSubmitClick,
        messageContextHolder,
    } = props;

    return (
        <>
            <Modal
                open={openCreateModel}
                title={t('app.feature.manage.table.createForm.title')}
                okText={t('app.feature.manage.table.createForm.create')}
                cancelText={t('app.feature.manage.table.createForm.cancel')}
                onCancel={handleCreateCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='50%'
            >
                {messageContextHolder}
                <Form
                    form={createForm}
                    layout='horizontal'
                    name='form_create_in_modal'
                    align='end'
                    initialValues={{ type: 0, isActive: true }}
                >
                    <Form.Item
                        name='name'
                        label={t('app.feature.manage.table.createForm.name')}
                        tooltip={t('app.feature.manage.table.createForm.nameTooltip')}
                        rules={[
                            {
                                required: true,
                                message: t('app.feature.manage.table.createForm.nameIsRequired'),
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        name='desc'
                        label={t('app.feature.manage.table.createForm.desc')}
                        tooltip={t('app.feature.manage.table.createForm.descTooltip')}
                        rules={[
                            {
                                required: true,
                                message: t('app.feature.manage.table.createForm.descIsRequired'),
                            },
                        ]}
                    >
                        <TextArea allowClear rows={4} />
                    </Form.Item>
                    <Form.Item
                        name='isActive'
                        label={t('app.feature.manage.table.createForm.isActive')}
                        tooltip={t('app.feature.manage.table.createForm.isActiveTooltip')}
                        valuePropName='checked'
                    >
                        <Switch
                            defaultChecked
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>

                    <Space>
                        <Button type='text' htmlType='reset'>
                            {t('app.feature.manage.table.createForm.resetButton')}
                        </Button>
                        <Button danger onClick={handleCreateCancelClick}>
                            {t('app.feature.manage.table.createForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleCreateSubmitClick(createForm.getFieldsValue())}
                            form={createForm}
                            type='primary'
                        >
                            {t('app.feature.manage.table.createForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
