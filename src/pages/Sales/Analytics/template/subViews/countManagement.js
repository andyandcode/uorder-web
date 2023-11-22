import { Col, Layout, Row, Statistic } from 'antd';

const { Content } = Layout;

export default function CountManagement(props) {
    const { t, countManagementData } = props;

    return (
        <>
            <Content
                style={{
                    marginTop: 40,
                    padding: 12,
                    borderRadius: 4,
                }}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.dishes')}
                            value={countManagementData.dishes}
                            suffix={''}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.menus')}
                            value={countManagementData.menus}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.tables')}
                            value={countManagementData.tables}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.total_revenue')}
                            value={countManagementData.revenue}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.total_order_completed')}
                            value={countManagementData.orderCompleted}
                        />
                    </Col>
                </Row>
            </Content>
        </>
    );
}
