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
        onFinishSelectTimeTopSellers,
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
        onFinishSelectTimeTopSellers,
        countManagementData,
    };
}
