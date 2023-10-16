import { Col, Layout, Row, Statistic } from 'antd';

const { Content } = Layout;

export default function CountManagement(props) {
    const { t } = props;

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
                            title={t('app.feature.sales.analytics.countManagement.dishes')}
                            value={1128}
                            suffix={''}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('app.feature.sales.analytics.countManagement.menus')}
                            value={93}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('app.feature.sales.analytics.countManagement.tables')}
                            value={93}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('app.feature.sales.analytics.countManagement.totalRevenue')}
                            value={1128}
                        />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t(
                                'app.feature.sales.analytics.countManagement.totalOrderCompleted',
                            )}
                            value={93}
                        />
                    </Col>
                </Row>
            </Content>
        </>
    );
}
