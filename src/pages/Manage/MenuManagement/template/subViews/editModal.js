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
} from 'antd';
import moment from 'moment/moment';
import React from 'react';

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
        dishData,
    } = props;

    return (
        <>
            <Modal
                open={openEditModel}
                title={t('app.feature.manage.menu.editForm.title')}
                okText={t('app.feature.manage.menu.editForm.create')}
                cancelText={t('app.feature.manage.menu.editForm.cancel')}
                onCancel={handleEditCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='60%'
            >
                {messageContextHolder}
                <Form
                    form={editForm}
                    align='end'
                    layout='horizontal'
                    name='form_edit_in_modal'
                    initialValues={{ dishes: dishData.id }}
                >
                    <Row gutter={[52]}>
                        <Col span={12}>
                            <ConfigProvider direction='rtl'>
                                <Form.Item
                                    name='id'
                                    label={t('app.feature.manage.menu.editForm.id')}
                                    tooltip={t('app.feature.manage.menu.editForm.idTooltip')}
                                >
                                    <Input disabled bordered={false} />
                                </Form.Item>
                                <Form.Item
                                    name='createdAt'
                                    label={t('app.feature.manage.menu.editForm.createdAt')}
                                    tooltip={t('app.feature.manage.menu.editForm.createdAtTooltip')}
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
                                label={t('app.feature.manage.menu.editForm.name')}
                                tooltip={t('app.feature.manage.menu.editForm.nameTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.menu.editForm.nameIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name='desc'
                                label={t('app.feature.manage.menu.editForm.desc')}
                                tooltip={t('app.feature.manage.menu.editForm.descTooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'app.feature.manage.menu.editForm.descIsRequired',
                                        ),
                                    },
                                ]}
                            >
                                <TextArea allowClear rows={4} />
                            </Form.Item>
                            <Form.Item
                                name='isActive'
                                label={t('app.feature.manage.menu.editForm.isActive')}
                                tooltip={t('app.feature.manage.menu.editForm.isActiveTooltip')}
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
                                            color = item.isActive === true ? color : '';
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
                        <Button danger htmlType='reset' onClick={handleEditCancelClick}>
                            {t('app.feature.manage.menu.editForm.cancelButton')}
                        </Button>
                        <Button
                            onClick={() => handleEditSubmitClick(editForm.getFieldsValue())}
                            form={editForm}
                            type='primary'
                        >
                            {t('app.feature.manage.menu.editForm.createButton')}
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
}
