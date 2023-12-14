export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        ordersToday,
        revenueChartConfig,
        revenueData,
        topSellersChartConfig,
        topSellersData,
        countManagementData,
    } = props;
    return {
        history,
        dispatch,
        t,
        ordersToday,
        revenueChartConfig,
        revenueData,
        topSellersChartConfig,
        topSellersData,
        countManagementData,
    };
}
