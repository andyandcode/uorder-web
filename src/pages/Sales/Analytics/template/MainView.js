import { Layout, Typography } from 'antd';
import CountManagement from './subViews/countManagement';
import OrdersToday from './subViews/ordersToday';
import RevenueChart from './subViews/revenueChart';
import TopSellersChart from './subViews/topSellers';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView(props) {
    const { t } = props;
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.sales.analytics.label')}
                </Title>
                <OrdersToday {...props} />
                <RevenueChart {...props} />
                <TopSellersChart {...props} />
                <CountManagement {...props} />
            </Content>
        </>
    );
}
