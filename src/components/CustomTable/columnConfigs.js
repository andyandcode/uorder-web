import { Badge, Tooltip } from 'antd';
import moment from 'moment/moment';
import { NumericFormat } from 'react-number-format';
import { EnumRender } from '../EnumRender';
import NestedTable from '../NestedTable';
import TableFilter from '../TableFilter';

const DishTable = 'DishTable';
const MenuTable = 'MenuTable';

const TableSwitch = { DishTable, MenuTable };

const DishColumns = (t) => {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('app.feature.table.dishManagement.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 6,
            },
            ...TableFilter('name', t('app.feature.table.dishManagement.name')),
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
            title: t('app.feature.table.dishManagement.price'),
            align: 'right',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 5,
            },
            render: (data) => {
                return (
                    <NumericFormat
                        value={data}
                        suffix={' VND'}
                        thousandSeparator=','
                        displayType='text'
                    />
                );
            },
        },
        {
            key: 'completionTime',
            dataIndex: 'completionTime',
            title: t('app.feature.table.dishManagement.completionTime'),
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
            title: t('app.feature.table.dishManagement.isActive.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 3,
            },
            render: (data) => {
                return EnumRender.ActiveStatus(t, data);
            },
        },
        {
            key: 'qtyPerDate',
            dataIndex: 'qtyPerDate',
            title: t('app.feature.table.dishManagement.qtyPerDate'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.qtyPerDate - b.qtyPerDate,
                multiple: 2,
            },
            render: (data) => {
                return <NumericFormat value={data} thousandSeparator=',' displayType='text' />;
            },
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: t('app.feature.table.dishManagement.typeName.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.type - b.type,
                multiple: 1,
            },
            render: (data) => {
                return EnumRender.DishType(t, data);
            },
        },
    ];
};

const MenuColumns = (t) => {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('app.feature.table.dishManagement.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 6,
            },
            ...TableFilter('name', t('app.feature.table.dishManagement.name')),
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
            title: t('app.feature.table.dishManagement.isActive.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 3,
            },
            render: (data) => {
                return EnumRender.ActiveStatus(t, data);
            },
        },
    ];
};

const TablesColumns = (t) => {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: t('app.feature.table.tableManagement.name'),
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 1,
            },
            ...TableFilter('name', t('app.feature.table.tableManagement.name')),
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
            title: t('app.feature.table.tableManagement.isActive.label'),
            align: 'center',
            sorter: {
                compare: (a, b) => a.isActive - b.isActive,
                multiple: 2,
            },
            render: (data) => {
                return EnumRender.ActiveStatus(t, data);
            },
        },
    ];
};

const OrderColumns = (t) => {
    return [
        {
            key: 'id',
            dataIndex: 'id',
            title: t('app.feature.table.orderManagement.id'),
            ellipsis: {
                showTitle: true,
            },
            ...TableFilter('id', t('app.feature.table.orderManagement.id')),
            render: (data) => (
                <Tooltip placement='topLeft' title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: t('app.feature.table.orderManagement.createdAt'),
            sorter: {
                compare: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
                multiple: 1,
            },
            ellipsis: {
                showTitle: false,
            },
        },
        {
            key: 'tableName',
            dataIndex: 'tableName',
            title: t('app.feature.table.orderManagement.tableName'),
            sorter: {
                compare: (a, b) => a.tableName.localeCompare(b.tableName),
                multiple: 2,
            },
            ellipsis: {
                showTitle: false,
            },
        },
        {
            key: 'total',
            dataIndex: 'total',
            title: t('app.feature.table.orderManagement.total'),
            sorter: {
                compare: (a, b) => a.total - b.total,
                multiple: 3,
            },
            ellipsis: {
                showTitle: false,
            },
            render: (data) => {
                return (
                    <NumericFormat
                        value={data}
                        suffix={' VND'}
                        thousandSeparator=','
                        displayType='text'
                    />
                );
            },
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: t('app.feature.table.orderManagement.orderStatus'),
            render: (data) => EnumRender.OrderStatus(t, data),
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: t('app.feature.table.orderManagement.paymentStatus'),
            render: (data) => EnumRender.PaymentStatus(t, data),
        },
    ];
};

const expandedRowRenderSelection = (t, record, props) => {
    const plug = record.dishes ? true : false;
    switch (plug) {
        case true:
            const menuColumns = [
                {
                    key: 'name',
                    dataIndex: 'name',
                    title: t('app.feature.table.dishManagement.name'),
                    sorter: {
                        compare: (a, b) => a.name.localeCompare(b.name),
                        multiple: 6,
                    },
                },
                {
                    key: 'price',
                    dataIndex: 'price',
                    title: t('app.feature.table.dishManagement.price'),
                    align: 'right',
                    sorter: {
                        compare: (a, b) => a.price - b.price,
                        multiple: 5,
                    },
                    render: (data) => {
                        return (
                            <NumericFormat
                                value={data}
                                suffix={' VND'}
                                thousandSeparator=','
                                displayType='text'
                            />
                        );
                    },
                },
                {
                    key: 'isActive',
                    dataIndex: 'isActive',
                    title: t('app.feature.table.dishManagement.isActive.label'),
                    align: 'center',
                    sorter: {
                        compare: (a, b) => a.isActive - b.isActive,
                        multiple: 3,
                    },
                    render: (data) => {
                        let status = data === true ? 'success' : 'default';
                        let typeName =
                            data === true
                                ? t('app.feature.table.dishManagement.isActive.active')
                                : t('app.feature.table.dishManagement.isActive.off');
                        return <Badge status={status} text={typeName} />;
                    },
                },
            ];
            return (
                <NestedTable
                    {...props}
                    columns={menuColumns}
                    dataSource={record.dishes}
                    pagination={false}
                    locale={{
                        emptyText: t('app.feature.table.emptyData'),
                        triggerDesc: t('app.feature.table.triggerDesc'),
                        triggerAsc: t('app.feature.table.triggerAsc'),
                        cancelSort: t('app.feature.table.cancelSort'),
                    }}
                    size='small'
                />
            );
        default:
            return (
                <>
                    <p>{record.desc}</p>
                </>
            );
    }
};

const TableColumns = {
    TableSwitch,
    DishColumns,
    MenuColumns,
    expandedRowRenderSelection,
    TablesColumns,
    OrderColumns,
};
export default TableColumns;
