import { Line } from '@ant-design/charts';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function RevenueChart(props) {
    const { t, revenueChartConfig } = props;

    return (
        <>
            <Content
                style={{
                    marginTop: 40,
                    padding: 12,
                    minHeight: 360,
                    borderRadius: 4,
                }}
            >
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.sales.analytics.revenue.title')}
                </Title>
                <Line {...revenueChartConfig} />
            </Content>
        </>
    );
}
