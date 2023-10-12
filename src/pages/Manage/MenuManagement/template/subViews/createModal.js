import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
    Tag,
    Upload,
} from 'antd';
import React from 'react';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

export default function CreateModal(props) {
    const {
        t,
        createForm,
        openCreateModel,
        handleCreateCancelClick,
        handleCreateSubmitClick,
        messageContextHolder,
        dishData,
    } = props;

    return (
        <>
            <Modal
                open={openCreateModel}
                title={t('app.feature.manage.menu.createForm.title')}
                okText={t('app.feature.manage.menu.createForm.create')}
                cancelText={t('app.feature.manage.menu.createForm.cancel')}
                onCancel={handleCreateCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='60%'
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
                                label={t('app.feature.manage.menu.createForm.name')}
                                tooltip={t('app.feature.manage.menu.createForm.nameTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.menu.createForm.nameIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name='desc'
                                label={t('app.feature.manage.menu.createForm.desc')}
                                tooltip={t('app.feature.manage.menu.createForm.descTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.menu.createForm.descIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <TextArea allowClear rows={4} />
                            </Form.Item>
                            <Form.Item
                                name='isActive'
                                label={t('app.feature.manage.menu.createForm.isActive')}
                                tooltip={t('app.feature.manage.menu.createForm.isActiveTooltip')}
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
                                    name='dishes'
                                    label={t('app.feature.manage.menu.createForm.dishes')}
                                    tooltip={t('app.feature.manage.menu.createForm.dishesTooltip')}
                                    className={'custom_select_in_menu'}
                                >
                                    <Select
                                        mode='multiple'
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={() => {}}
                                        optionLabelProp='label'
                                    >
                                        {dishData.map((item) => {
                                            let color = item.type === 0 ? 'green' : 'geekblue';
                                            let typeName =
                                                item.type === 0
                                                    ? t(
                                                          'app.feature.table.dishManagement.typeName.food',
                                                      )
                                                    : t(
                                                          'app.feature.table.dishManagement.typeName.drink',
                                                      );
                                            return (
                                                <Option
                                                    value={item.id}
                                                    label={item.name}
                                                    key={item.key}
                                                >
                                                    <Space>
                                                        <Tag color={color}>{typeName}</Tag>
                                                        {item.name}
                                                    </Space>
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </ConfigProvider>
                        </Col>
                    </Row>

                    <Space>
                        <Button type='text' htmlType='reset'>
                            {t('app.feature.manage.menu.createForm.resetButton')}
                        </Button>
                        <Button danger onClick={handleCreateCancelClick}>
                            {t('app.feature.manage.menu.createForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleCreateSubmitClick(createForm.getFieldsValue())}
                            form={createForm}
                            type='primary'
                        >
                            {t('app.feature.manage.menu.createForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
