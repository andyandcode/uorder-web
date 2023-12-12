import { useEffect, useState } from 'react';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { getCountManagement, getRevenue, getTopSellers } from './Slice';
import { AnalyticsConfig } from './analyticsConfig';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [revenueData, setRevenueData] = useState([]);
    const [topSellersData, setTopSellersData] = useState([]);
    const [countManagementData, setCountManagementData] = useState([]);

    const ordersToday = AnalyticsConfig.OrdersToday(props);
    const revenueChartConfig = AnalyticsConfig.RevenueChart(revenueData);
    const topSellersChartConfig = AnalyticsConfig.TopSellersChart(topSellersData);

    useEffect(() => {
        setTimeout(async () => {
            await dispatch(getRevenue()).then((result) => {
                setRevenueData(Utils.getValues(result, 'payload', []));
            });
            await dispatch(getTopSellers()).then((result) => {
                setTopSellersData(Utils.getValues(result, 'payload', []));
            });
            await dispatch(getCountManagement()).then((result) => {
                setCountManagementData(Utils.getValues(result, 'payload', []));
            });
        }, 500);
    }, [dispatch]);

    const containerProps = {
        ...props,
        history,
        t,
        ordersToday,
        revenueChartConfig,
        revenueData,
        topSellersChartConfig,
        topSellersData,
        countManagementData,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
