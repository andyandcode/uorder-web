import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Layout, Row, Select, Space, Typography } from 'antd';
import CustomTable from '../../../../components/CustomTable';
import TableColumns from '../../../../components/CustomTable/columnConfigs';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function MainView(props) {
    const {
        t,
        columns,
        data,
        loadingTable,
        handleActionButtonEditClick,
        expandedRowRenderSelection,
        orderStatusSelect,
        paymentStatusSelect,
        onChangePaymentStatusSelect,
        tableData,
        onChangeOrderStatusSelect,
    } = props;
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.sales.order')}
                </Title>
                <Divider />

                <Row
                    style={{
                        paddingBottom: 24,
                    }}
                >
                    <Col span={18}>
                        <Space size={'large'}>
                            <Space>
                                <Text>{t('main.entities.order_status.label')}</Text>
                                <Select
                                    defaultValue={-1}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => onChangeOrderStatusSelect(e)}
                                    options={orderStatusSelect}
                                />
                            </Space>
                            <Space>
                                <Text>{t('main.entities.payment_status.label')}</Text>
                                <Select
                                    defaultValue={-1}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => onChangePaymentStatusSelect(e)}
                                    options={paymentStatusSelect}
                                />
                            </Space>
                        </Space>
                    </Col>
                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='text' icon={<PlusOutlined />} style={{ color: '#5d56d5' }}>
                            {t('main.components.button.new_order')}
                        </Button>
                    </Col>
                </Row>
                <CustomTable
                    loadingTable={loadingTable}
                    columns={columns}
                    dataSource={tableData.dataSource}
                    handleActionButtonEditClick={(data) => handleActionButtonEditClick(data)}
                    // handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    // handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    // handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    expandedRowRenderSelection={() =>
                        expandedRowRenderSelection(t, data, TableColumns.TableSwitch.DishTable)
                    }
                />
            </Content>
        </>
    );
}
