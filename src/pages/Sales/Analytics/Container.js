import { useState } from 'react';
import RenevueData from '../../../database/revenue.json';
import TopSellersData from '../../../database/topSellers.json';
import propsProvider from './PropsProvider';
import { AnalyticsConfig } from './analyticsConfig';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;
    const [revenueData, setRevenueData] = useState(RenevueData);
    const [topSellersData, setTopSellersData] = useState(RenevueData);

    const ordersToday = AnalyticsConfig.OrdersToday(props);
    const revenueChartConfig = AnalyticsConfig.RevenueChart(revenueData);
    const topSellersChartConfig = AnalyticsConfig.TopSellersChart(TopSellersData);

    const onFinishSelectTimeTopSellers = (fieldsValue) => {
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            'range-picker': [
                rangeValue[0].format('DD/MM/YYYY'),
                rangeValue[1].format('DD/MM/YYYY'),
            ],
        };
        console.log('Received values of form: ', values);
    };

    const containerProps = {
        ...props,
        history,
        t,
        ordersToday,
        revenueChartConfig,
        revenueData,
        topSellersChartConfig,
        topSellersData,
        onFinishSelectTimeTopSellers,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
