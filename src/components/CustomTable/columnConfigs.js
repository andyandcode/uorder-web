import { Tooltip } from 'antd';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { CurrencyFormat } from '../CurrencyFormat';
import { DateType, EnumRender } from '../EnumRender';
import NestedTable from '../NestedTable';
import TableFilter from '../TableFilter';

const DishTable = 'DishTable';
const MenuTable = 'MenuTable';
const OrderTable = 'OrderTable';
const BookingTable = 'BookingTable';
const TableTable = 'TableTable';
const AccountTable = 'AccountColumns';
const DiscountCodeTable = 'DiscountCodeTable';

const TableSwitch = { DishTable, MenuTable, OrderTable, BookingTable, TableTable, AccountTable, DiscountCodeTable };

const DishColumns = (t) => {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('main.entities.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 6,
            },
            ...TableFilter('name', t('main.entities.name')),
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: t('main.entities.price'),
            align: 'right',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 5,
            },
            render: (data) => {
                return <CurrencyFormat.Minimal value={data} />;
            },
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: t('main.entities.active_status.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 3,
            },
            render: (data) => EnumRender.ActiveStatus(t, data),
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: t('main.entities.dish_type.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.type - b.type,
                multiple: 1,
            },
            render: (data) => EnumRender.DishType(t, data),
        },
    ].filter((item) => !item.hidden);
};

const MenuColumns = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('main.entities.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 6,
            },
            ...TableFilter('name', t('main.entities.name')),
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: t('main.entities.active_status.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 3,
            },
            render: (data) => EnumRender.ActiveStatus(t, data),
        },
    ].filter((item) => !item.hidden);
};

const AccountColumns = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'id',
            dataIndex: 'id',
            title: t('main.entities.id'),
            sorter: {
                compare: (a, b) => a.id.localeCompare(b.id),
                multiple: 1,
            },
            ...TableFilter('id', t('main.entities.id')),
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'username',
            dataIndex: 'username',
            title: t('main.entities.username'),
            sorter: {
                compare: (a, b) => a.username.localeCompare(b.username),
                multiple: 2,
            },
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'roleName',
            dataIndex: 'roleName',
            title: t('main.entities.roles.label'),
            sorter: {
                compare: (a, b) => a.roleName.localeCompare(b.roleName),
                multiple: 3,
            },
            ellipsis: {
                showTitle: false,
            },
            render: (data) => EnumRender.Roles(t, data),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: t('main.entities.active_status.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 4,
            },
            render: (data) => EnumRender.ActiveStatus(t, data),
        },
    ].filter((item) => !item.hidden);
};

const TablesColumns = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('main.entities.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 1,
            },
            ...TableFilter('name', t('main.entities.name')),
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: t('main.entities.active_status.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 2,
            },
            render: (data) => EnumRender.ActiveStatus(t, data),
        },
        {
            key: 'route',
            dataIndex: 'route',
            hidden: true,
        },
    ].filter((item) => !item.hidden);
};

const OrderColumns = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'id',
            dataIndex: 'id',
            title: t('main.entities.id'),
            ellipsis: {
                showTitle: true,
            },
            ...TableFilter('id', t('main.entities.id')),
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: t('main.entities.created_at'),
            sorter: {
                compare: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
                multiple: 1,
            },
            ellipsis: {
                showTitle: false,
            },
            render: (data) => {
                return <p>{moment(data).format('hh:mm DD/MM/YYYY')}</p>;
            },
        },
        {
            key: 'total',
            dataIndex: 'total',
            title: t('main.entities.total'),
            sorter: {
                compare: (a, b) => a.total - b.total,
                multiple: 3,
            },
            ellipsis: {
                showTitle: false,
            },
            render: (data) => {
                return <CurrencyFormat.Minimal value={data} />;
            },
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: t('main.entities.order_status.label'),
            render: (data) => EnumRender.OrderStatus(t, data),
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: t('main.entities.payment_status.label'),
            render: (data) => EnumRender.PaymentStatus(t, data),
        },
    ].filter((item) => !item.hidden);
};
const DiscountCodeColumns = (t) => {
    return [
        {
            key: 'code',
            dataIndex: 'code',
            title: t('main.entities.code'),
            ...TableFilter('code', t('main.entities.code')),
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'startDate',
            dataIndex: 'startDate',
            title: t('main.entities.start_date'),
            align: 'center',
            sorter: {
                compare: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
                multiple: 1,
            },
            render: (data) => EnumRender.CalculatorTime(t, data, DateType.StartDateKey),
        },
        {
            key: 'endDate',
            dataIndex: 'endDate',
            title: t('main.entities.end_date'),
            align: 'center',
            sorter: {
                compare: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
                multiple: 1,
            },
            render: (data) => EnumRender.CalculatorTime(t, data, DateType.EndDateKey),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: t('main.entities.active_status.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 3,
            },
            render: (data) => EnumRender.ActiveStatus(t, data),
        },
    ].filter((item) => !item.hidden);
};
const ExpandedRowRenderSelection = (
    data,
    t,
    switchActionColumn,
    handleQuickActionButtonTurnOnClick,
    handleQuickDeleteConfirm,
    handleQuickTurnOffConfirm,
) => {
    switch (switchActionColumn) {
        case TableColumns.TableSwitch.MenuTable:
            const menuColumns = [
                {
                    key: 'name',
                    dataIndex: 'name',
                    title: t('main.entities.name'),
                    sorter: {
                        compare: (a, b) => a.name.localeCompare(b.name),
                        multiple: 6,
                    },
                },
                {
                    key: 'price',
                    dataIndex: 'price',
                    title: t('main.entities.price'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.price - b.price,
                        multiple: 5,
                    },
                    render: (data) => {
                        return <CurrencyFormat.Minimal value={data} />;
                    },
                },
                {
                    key: 'id',
                    dataIndex: 'id',
                    title: t('main.entities.id'),
                    align: 'right',
                    render: (data) => data,
                },
                {
                    key: 'parentId',
                    dataIndex: 'parentId',
                    title: t('main.entities.id'),
                    align: 'right',
                    render: (data) => data,
                    hidden: true,
                },
                {
                    key: 'isActive',
                    dataIndex: 'isActive',
                    title: t('main.entities.active_status.label'),
                    align: 'center',
                    sorter: {
                        compare: (a, b) => a.isActive - b.isActive,
                        multiple: 3,
                    },
                    render: (data) => EnumRender.ActiveStatus(t, data),
                },
            ].filter((item) => !item.hidden);
            return (
                <NestedTable
                    columns={menuColumns}
                    dataSource={data}
                    pagination={false}
                    locale={{
                        emptyText: t('main.components.table.empty_data'),
                        triggerDesc: t('main.components.table.trigger_desc'),
                        triggerAsc: t('main.components.table.trigger_asc'),
                        cancelSort: t('main.components.button.cancel'),
                    }}
                    size='small'
                    switchActionColumn={switchActionColumn}
                    handleQuickActionButtonTurnOnClick={handleQuickActionButtonTurnOnClick}
                    handleQuickDeleteConfirm={handleQuickDeleteConfirm}
                    handleQuickTurnOffConfirm={handleQuickTurnOffConfirm}
                />
            );
        case TableColumns.TableSwitch.DishTable:
            return (
                <>
                    <p>{data.desc}</p>
                </>
            );
        case TableColumns.TableSwitch.TableTable:
            return (
                <>
                    <p>{data.desc}</p>
                </>
            );
        case TableColumns.TableSwitch.OrderTable:
            const orderColumns = [
                {
                    key: 'dishName',
                    dataIndex: 'dishName',
                    title: t('main.entities.name'),
                    sorter: {
                        compare: (a, b) => a.dishName.localeCompare(b.dishName),
                        multiple: 1,
                    },
                },
                {
                    key: 'qty',
                    dataIndex: 'qty',
                    title: t('main.entities.qty'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.qty - b.qty,
                        multiple: 2,
                    },
                    render: (data) => {
                        return <NumericFormat value={data} thousandSeparator=',' displayType='text' />;
                    },
                },
                {
                    key: 'unitPrice',
                    dataIndex: 'unitPrice',
                    title: t('main.entities.unitPrice'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.unitPrice - b.unitPrice,
                        multiple: 3,
                    },
                    render: (data) => {
                        return <CurrencyFormat.Minimal value={data} />;
                    },
                },
                {
                    key: 'amount',
                    dataIndex: 'amount',
                    title: t('main.entities.amount'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.amount - b.amount,
                        multiple: 4,
                    },
                    render: (data) => {
                        return <CurrencyFormat.Minimal value={data} />;
                    },
                },
            ].filter((item) => !item.hidden);
            return (
                <NestedTable
                    columns={orderColumns}
                    dataSource={data.orderDetails}
                    pagination={false}
                    locale={{
                        emptyText: t('main.components.table.empty_data'),
                        triggerDesc: t('main.components.table.trigger_desc'),
                        triggerAsc: t('main.components.table.trigger_asc'),
                        cancelSort: t('main.components.button.cancel'),
                    }}
                    size='small'
                />
            );
        case TableColumns.TableSwitch.BookingTable:
            const bookingColumns = [
                {
                    key: 'dishName',
                    dataIndex: 'dishName',
                    title: t('main.entities.name'),
                    sorter: {
                        compare: (a, b) => a.dishName.localeCompare(b.dishName),
                        multiple: 1,
                    },
                },
                {
                    key: 'qty',
                    dataIndex: 'qty',
                    title: t('main.entities.qty'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.qty - b.qty,
                        multiple: 2,
                    },
                    render: (data) => {
                        return <NumericFormat value={data} thousandSeparator=',' displayType='text' />;
                    },
                },
                {
                    key: 'unitPrice',
                    dataIndex: 'unitPrice',
                    title: t('main.entities.unitPrice'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.unitPrice - b.unitPrice,
                        multiple: 3,
                    },
                    render: (data) => {
                        return <CurrencyFormat.Minimal value={data} />;
                    },
                },
                {
                    key: 'amount',
                    dataIndex: 'amount',
                    title: t('main.entities.amount'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.amount - b.amount,
                        multiple: 4,
                    },
                    render: (data) => {
                        return <CurrencyFormat.Minimal value={data} />;
                    },
                },
            ].filter((item) => !item.hidden);
            return (
                <NestedTable
                    columns={bookingColumns}
                    dataSource={data.orderDetails}
                    pagination={false}
                    locale={{
                        emptyText: t('main.components.table.empty_data'),
                        triggerDesc: t('main.components.table.trigger_desc'),
                        triggerAsc: t('main.components.table.trigger_asc'),
                        cancelSort: t('main.components.button.cancel'),
                    }}
                    size='small'
                />
            );
        default:
            break;
    }
};

const TableColumns = {
    TableSwitch,
    DishColumns,
    MenuColumns,
    ExpandedRowRenderSelection,
    TablesColumns,
    OrderColumns,
    AccountColumns,
    DiscountCodeColumns,
};
export default TableColumns;
