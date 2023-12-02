import { Col, Divider, Layout, Row, Select, Space, Typography } from 'antd';
import { ButtonLocated } from '../../../../components/ButtonLocated';
import CustomTable from '../../../../components/CustomTable';
import TableColumns from '../../../../components/CustomTable/columnConfigs';
import BillQuickViewModal from './subViews/billQuickViewModal';
import CreateModal from './subViews/createModal';
import ViewModal from './subViews/viewModal';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function MainView(props) {
    const {
        t,
        columns,
        dishData,
        handleActionButtonViewClick,
        expandedRowRenderSelection,
        orderStatusSelect,
        paymentStatusSelect,
        onChangePaymentStatusSelect,
        tableData,
        onChangeOrderStatusSelect,
        handleNewOrderClick,
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
                        <ButtonLocated.NewOrderButton handleButton={handleNewOrderClick} />
                    </Col>
                </Row>
                <CustomTable
                    columns={columns}
                    dataSource={tableData.dataSource}
                    handleActionButtonViewClick={(data) => handleActionButtonViewClick(data)}
                    expandedRowRenderSelection={() =>
                        expandedRowRenderSelection(t, dishData, TableColumns.TableSwitch.OrderTable)
                    }
                    switchActionColumn={TableColumns.TableSwitch.OrderTable}
                />
                <CreateModal {...props} />
                <ViewModal {...props} />
                <BillQuickViewModal {...props} />
            </Content>
        </>
    );
}
