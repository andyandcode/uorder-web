import { CheckOutlined, CloseOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Divider,
    Form,
    Input,
    Layout,
    Modal,
    Select,
    Space,
    Switch,
    Typography,
} from 'antd';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import CustomTable from '../../../../components/CustomTable';
import ValidateSubmitButton from '../../../../components/ValidateSubmitButton';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function MainView(props) {
    const {
        t,
        columns,
        data,
        enterLoading,
        loadings,
        openModel,
        handleCancelClick,
        handleSubmitClick,
    } = props;
    const [form] = Form.useForm();

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.manage.dish.label')}
                </Title>
                <Divider />

                <Space
                    direction='horizontal'
                    align='end'
                    style={{
                        width: '100%',
                        paddingBottom: '24px',
                    }}
                >
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}
                    >
                        {t('app.feature.manage.dish.button.add')}
                    </Button>
                    <Button icon={<HourglassOutlined />} block>
                        {t('app.feature.manage.dish.button.activeLog')}
                    </Button>
                </Space>
                <CustomTable columns={columns} dataSource={data} />
                <Modal
                    open={openModel}
                    title={t('app.feature.manage.dish.createForm.title')}
                    okText={t('app.feature.manage.dish.createForm.create')}
                    cancelText={t('app.feature.manage.dish.createForm.cancel')}
                    onCancel={() => handleCancelClick()}
                    maskClosable={false}
                    footer={[]}
                >
                    <Form
                        form={form}
                        layout='horizontal'
                        name='form_in_modal'
                        align='end'
                        initialValues={{ type: '0', isActive: true }}
                    >
                        <Form.Item
                            name='name'
                            label={t('app.feature.manage.dish.createForm.name')}
                            tooltip={t('app.feature.manage.dish.createForm.nameTooltip')}
                            rules={[
                                {
                                    required: true,
                                    message: t('app.feature.manage.dish.createForm.nameIsRequired'),
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 395,
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='desc'
                            label={t('app.feature.manage.dish.createForm.desc')}
                            tooltip={t('app.feature.manage.dish.createForm.descTooltip')}
                            rules={[
                                {
                                    required: true,
                                    message: t('app.feature.manage.dish.createForm.descIsRequired'),
                                },
                            ]}
                        >
                            <TextArea rows={4} />
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
                            label={t('app.feature.manage.dish.createForm.completionTime')}
                            tooltip={t('app.feature.manage.dish.createForm.completionTimeTooltip')}
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
                            label={t('app.feature.manage.dish.createForm.type')}
                            tooltip={t('app.feature.manage.dish.createForm.typeTooltip')}
                        >
                            <Select
                                style={{
                                    width: 120,
                                }}
                            >
                                <Option value='0'>
                                    {t('app.feature.table.dishManagement.typeName.food')}
                                </Option>
                                <Option value='1'>
                                    {t('app.feature.table.dishManagement.typeName.drink')}
                                </Option>
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button htmlType='reset'>
                                {t('app.feature.manage.dish.createForm.resetButton')}
                            </Button>
                            <Button onClick={() => handleCancelClick()}>
                                {t('app.feature.manage.dish.createForm.cancelButton')}
                            </Button>
                            <ValidateSubmitButton
                                onClick={() => {
                                    form.validateFields().then((values) => {
                                        form.resetFields();
                                        handleSubmitClick(values);
                                    });
                                }}
                                form={form}
                                type='primary'
                                label={t('app.feature.manage.dish.createForm.createButton')}
                            />
                        </Space>
                    </Form>
                </Modal>
            </Content>
        </>
    );
}
