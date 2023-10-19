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
                        <Statistic title={t('main.pages.analytics.count_management.dishes')} value={1128} suffix={''} />
                    </Col>
                    <Col span={4}>
                        <Statistic title={t('main.pages.analytics.count_management.menus')} value={93} />
                    </Col>
                    <Col span={4}>
                        <Statistic title={t('main.pages.analytics.count_management.tables')} value={93} />
                    </Col>
                    <Col span={4}>
                        <Statistic title={t('main.pages.analytics.count_management.total_revenue')} value={1128} />
                    </Col>
                    <Col span={4}>
                        <Statistic
                            title={t('main.pages.analytics.count_management.total_order_completed')}
                            value={93}
                        />
                    </Col>
                </Row>
            </Content>
        </>
    );
}
