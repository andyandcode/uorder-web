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
    };
}
