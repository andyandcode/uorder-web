import { Badge, Tag } from 'antd';

const OrderStatus = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color='default' key={data}>
                        {t('app.utilities.orderStatus.ordered')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='gold' key={data}>
                        {t('app.utilities.orderStatus.toReceive')}
                    </Tag>
                </>
            );
        case 2:
            return (
                <>
                    <Tag color='green' key={data}>
                        {t('app.utilities.orderStatus.completed')}
                    </Tag>
                </>
            );
        case 3:
            return (
                <>
                    <Tag color='volcano' key={data}>
                        {t('app.utilities.orderStatus.cancelled')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};

const PaymentStatus = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color='cyan' key={data}>
                        {t('app.utilities.paymentStatus.paid')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='default' key={data}>
                        {t('app.utilities.paymentStatus.unpaid')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};

const DishType = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color='green' key={data}>
                        {t('app.feature.table.dishManagement.typeName.food')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='geekblue' key={data}>
                        {t('app.feature.table.dishManagement.typeName.drink')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};

const ActiveStatus = (t, data) => {
    switch (data) {
        case true:
            return (
                <>
                    <Badge
                        status={'success'}
                        text={t('app.feature.table.dishManagement.isActive.active')}
                    />
                </>
            );
        case false:
            return (
                <>
                    <Badge
                        status={'default'}
                        text={t('app.feature.table.dishManagement.isActive.off')}
                    />
                </>
            );
        default:
            break;
    }
};

const OrderStatusKey = (t) => {
    return [
        {
            value: -1,
            label: t('app.utilities.orderStatus.all'),
            text: t('app.utilities.orderStatus.all'),
        },
        {
            value: 0,
            label: t('app.utilities.orderStatus.ordered'),
            text: t('app.utilities.orderStatus.ordered'),
        },
        {
            value: 1,
            label: t('app.utilities.orderStatus.toReceive'),
            text: t('app.utilities.orderStatus.toReceive'),
        },
        {
            value: 2,
            label: t('app.utilities.orderStatus.completed'),
            text: t('app.utilities.orderStatus.completed'),
        },
        {
            value: 3,
            label: t('app.utilities.orderStatus.cancelled'),
            text: t('app.utilities.orderStatus.cancelled'),
        },
    ];
};
const PaymentStatusKey = (t) => {
    return [
        {
            value: -1,
            text: t('app.utilities.paymentStatus.all'),
            label: t('app.utilities.paymentStatus.all'),
        },
        {
            value: 0,
            text: t('app.utilities.paymentStatus.paid'),
            label: t('app.utilities.paymentStatus.paid'),
        },
        {
            value: 1,
            text: t('app.utilities.paymentStatus.unpaid'),
            label: t('app.utilities.paymentStatus.unpaid'),
        },
    ];
};

export const EnumKey = { OrderStatusKey, PaymentStatusKey };

export const EnumRender = { OrderStatus, PaymentStatus, DishType, ActiveStatus };
