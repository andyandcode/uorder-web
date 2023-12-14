import { Layout } from 'antd';
import CountManagement from './subViews/countManagement';
import RevenueChart from './subViews/revenueChart';
import TopSellersChart from './subViews/topSellers';

const { Content } = Layout;

export default function MainView(props) {
    return (
        <>
            <Content>
                <RevenueChart {...props} />
                <TopSellersChart {...props} />
                <CountManagement {...props} />
            </Content>
        </>
    );
}
