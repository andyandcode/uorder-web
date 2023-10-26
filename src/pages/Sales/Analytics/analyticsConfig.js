const OrdersToday = (props) => {
    const { t } = props;

    return [
        {
            key: All,
            title: t('main.pages.analytics.orders_today.count_all'),
            value: 10,
            total: true,
        },
        {
            key: Ordered,
            status: 'default',
            title: t('main.pages.analytics.orders_today.count_ordered'),
            value: 5,
        },
        {
            key: ToReceive,
            status: 'processing',
            title: t('main.pages.analytics.orders_today.count_to_receive'),
            value: 3,
        },
        {
            key: Completed,
            status: 'success',
            title: t('main.pages.analytics.orders_today.count_completed'),
            value: 1,
        },
        {
            key: Cancelled,
            status: 'error',
            title: t('main.pages.analytics.orders_today.count_cancelled'),
            value: 1,
        },
    ];
};

const RevenueChart = (data) => {
    return {
        data,
        padding: 'auto',
        xField: 'date',
        yField: 'total',
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', 'median'],
                end: ['max', '0'],
                color: '#F4664A',
            },
            {
                type: 'text',
                position: ['min', 'median'],
                offsetY: -4,
                style: {
                    textBaseline: 'bottom',
                },
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: '#F4664A',
                    lineDash: [2, 2],
                },
            },
        ],
        meta: {
            total: {
                formatter: (value, index) => {
                    return value.toLocaleString();
                },
            },
        },
    };
};

const TopSellersChart = (data) => {
    return {
        data,
        xField: 'time',
        yField: 'total',
        seriesField: 'name',
        legend: {
            position: 'top',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
        meta: {
            total: {
                formatter: (value, index) => {
                    return value.toLocaleString();
                },
            },
        },
    };
};

const All = 'All';
const Ordered = 'Ordered';
const ToReceive = 'ToReceive';
const Completed = 'Completed';
const Cancelled = 'Cancelled';

export const OrdersTodayKey = { All, Ordered, ToReceive, Completed, Cancelled };

export const AnalyticsConfig = { OrdersToday, RevenueChart, TopSellersChart };
