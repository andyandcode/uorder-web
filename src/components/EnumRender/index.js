import { Badge, Row, Tag, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const OrderStatus = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color='default' key={data}>
                        {t('main.entities.order_status.ordered')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='gold' key={data}>
                        {t('main.entities.order_status.to_receive')}
                    </Tag>
                </>
            );
        case 2:
            return (
                <>
                    <Tag color='green' key={data}>
                        {t('main.entities.order_status.completed')}
                    </Tag>
                </>
            );
        case 3:
            return (
                <>
                    <Tag color='volcano' key={data}>
                        {t('main.entities.order_status.cancelled')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};
const OrderStatusMinimal = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Typography.Text>{t('main.entities.order_status.ordered')}</Typography.Text>
                </>
            );
        case 1:
            return (
                <>
                    <Typography.Text>{t('main.entities.order_status.to_receive')}</Typography.Text>
                </>
            );
        case 2:
            return (
                <>
                    <Typography.Text>{t('main.entities.order_status.completed')}</Typography.Text>
                </>
            );
        case 3:
            return (
                <>
                    <Typography.Text>{t('main.entities.order_status.cancelled')}</Typography.Text>
                </>
            );
        default:
            break;
    }
};

const CalculatorTime = (t, data, dateType) => {
    const current = moment();
    const inData = moment(data);
    const count = inData.diff(current, 'days');
    switch (dateType) {
        case StartDateKey:
            if (moment(data).format('MM/DD/YYYY') > moment().format('MM/DD/YYYY')) {
                return (
                    <>
                        <Row style={{ flexDirection: 'column' }}>
                            <p>{moment(data).format('DD/MM/YYYY')}</p>
                            <Typography.Text type='secondary'>
                                {t('main.entities.expiry_date_has_not_happened_yet', {
                                    date: count,
                                    plural: count > 1 ? t('main.common.plural.days') : t('main.common.plural.day'),
                                })}
                            </Typography.Text>
                        </Row>
                    </>
                );
            }
            break;

        case EndDateKey:
            if (moment(data).format('MM/DD/YYYY') > moment().format('MM/DD/YYYY')) {
                return (
                    <>
                        <Row style={{ flexDirection: 'column' }}>
                            <p>{moment(data).format('DD/MM/YYYY')}</p>
                            <Typography.Text type='warning'>
                                {t('main.entities.expiry_date_remaining', {
                                    date: count,
                                    plural: count > 1 ? t('main.common.plural.days') : t('main.common.plural.day'),
                                })}
                            </Typography.Text>
                        </Row>
                    </>
                );
            }
            if (moment(data).format('MM/DD/YYYY') < moment().format('MM/DD/YYYY')) {
                return <Typography.Text type='danger'>{t('main.entities.expiry_date_expired')}</Typography.Text>;
            }
            break;

        default:
            break;
    }
    return <p>{moment(data).format('DD/MM/YYYY')}</p>;
};

const PaymentStatus = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color='cyan' key={data}>
                        {t('main.entities.payment_status.paid')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='default' key={data}>
                        {t('main.entities.payment_status.unpaid')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};
const PaymentStatusMinimal = (t, data) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Typography.Text>{t('main.entities.payment_status.paid')}</Typography.Text>
                </>
            );
        case 1:
            return (
                <>
                    <Typography.Text>{t('main.entities.payment_status.unpaid')}</Typography.Text>
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
                        {t('main.entities.dish_type.food')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color='geekblue' key={data}>
                        {t('main.entities.dish_type.drink')}
                    </Tag>
                </>
            );
        default:
            break;
    }
};

const DishTypeWithActievStatus = (t, data, status) => {
    switch (data) {
        case 0:
            return (
                <>
                    <Tag color={status === true ? 'green' : ''} key={data}>
                        {t('main.entities.dish_type.food')}
                    </Tag>
                </>
            );
        case 1:
            return (
                <>
                    <Tag color={status === true ? 'geekblue' : ''} key={data}>
                        {t('main.entities.dish_type.drink')}
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
                    <Badge status={'success'} text={t('main.entities.active_status.active')} />
                </>
            );
        case false:
            return (
                <>
                    <Badge status={'default'} text={t('main.entities.active_status.off')} />
                </>
            );
        default:
            break;
    }
};

const OrderStatusKey = () => {
    const { t } = useTranslation();
    return [
        {
            value: -1,
            label: t('main.entities.order_status.all'),
            text: t('main.entities.order_status.all'),
        },
        {
            value: 0,
            label: t('main.entities.order_status.ordered'),
            text: t('main.entities.order_status.ordered'),
        },
        {
            value: 1,
            label: t('main.entities.order_status.to_receive'),
            text: t('main.entities.order_status.to_receive'),
        },
        {
            value: 2,
            label: t('main.entities.order_status.completed'),
            text: t('main.entities.order_status.completed'),
        },
        {
            value: 3,
            label: t('main.entities.order_status.cancelled'),
            text: t('main.entities.order_status.cancelled'),
        },
    ];
};
const PaymentStatusKey = () => {
    const { t } = useTranslation();
    return [
        {
            value: -1,
            text: t('main.entities.payment_status.all'),
            label: t('main.entities.payment_status.all'),
        },
        {
            value: 0,
            text: t('main.entities.payment_status.paid'),
            label: t('main.entities.payment_status.paid'),
        },
        {
            value: 1,
            text: t('main.entities.payment_status.unpaid'),
            label: t('main.entities.payment_status.unpaid'),
        },
    ];
};
const Roles = (t, data) => {
    switch (data) {
        case 'admin':
            return <>{t('main.entities.roles.admin')}</>;
        case 'creator':
            return <>{t('main.entities.roles.creator')}</>;
        case 'staff':
            return <>{t('main.entities.roles.staff')}</>;
        default:
            break;
    }
};

const StartDateKey = 'StartDateKey';
const EndDateKey = 'EndDateKey';

export const DateType = { StartDateKey, EndDateKey };

export const EnumKey = { OrderStatusKey, PaymentStatusKey };

export const EnumRender = {
    OrderStatus,
    PaymentStatus,
    DishType,
    ActiveStatus,
    DishTypeWithActievStatus,
    PaymentStatusMinimal,
    OrderStatusMinimal,
    Roles,
    CalculatorTime,
};
