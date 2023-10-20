import { Tooltip } from 'antd';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { EnumRender } from '../EnumRender';
import NestedTable from '../NestedTable';
import TableFilter from '../TableFilter';

const DishTable = 'DishTable';
const MenuTable = 'MenuTable';

const TableSwitch = { DishTable, MenuTable };

const DishColumns = () => {
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
            key: 'price',
            dataIndex: 'price',
            title: t('main.entities.price'),
            align: 'right',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 5,
            },
            render: (data) => {
                return <NumericFormat value={data} suffix={' VND'} thousandSeparator=',' displayType='text' />;
            },
        },
        {
            key: 'completionTime',
            dataIndex: 'completionTime',
            title: t('main.entities.completion_time'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.completionTime - b.completionTime,
                multiple: 4,
            },
            render: (data) => data,
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
            key: 'qtyPerDay',
            dataIndex: 'qtyPerDay',
            title: t('main.entities.qty_per_day'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.qtyPerDay - b.qtyPerDay,
                multiple: 2,
            },
            render: (data) => {
                return <NumericFormat value={data} thousandSeparator=',' displayType='text' />;
            },
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
    ];
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
    ];
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
    ];
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
                return <NumericFormat value={data} suffix={' VND'} thousandSeparator=',' displayType='text' />;
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
    ];
};

const ExpandedRowRenderSelection = (data, props) => {
    const { t } = props;
    const plug = data.dishes ? true : false;
    switch (plug) {
        case true:
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
                        return <NumericFormat value={data} suffix={' VND'} thousandSeparator=',' displayType='text' />;
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
                    render: (data) => EnumRender.ActiveStatus(data),
                },
            ];
            return (
                <NestedTable
                    columns={menuColumns}
                    dataSource={data.dishes}
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
            return (
                <>
                    <p>{data.desc}</p>
                </>
            );
    }
};

const TableColumns = {
    TableSwitch,
    DishColumns,
    MenuColumns,
    ExpandedRowRenderSelection,
    TablesColumns,
    OrderColumns,
};
export default TableColumns;
