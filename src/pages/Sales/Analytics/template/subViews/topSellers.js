import { Line } from '@ant-design/charts';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function TopSellersChart(props) {
    const { t, topSellersChartConfig } = props;

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
                    {t('main.pages.analytics.top_sellers.title')}
                </Title>
                <Line {...topSellersChartConfig} />
            </Content>
        </>
    );
}
