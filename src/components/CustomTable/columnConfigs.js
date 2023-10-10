import { Badge, Tag } from 'antd';
import { NumericFormat } from 'react-number-format';
import TableFilter from '../TableFilter';

export const DishColumns = (props) => {
    const { t, handleEditClick } = props;

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
            render: (data) => data,
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
                let status = data === true ? 'success' : 'default';
                let typeName =
                    data === true
                        ? t('app.feature.table.dishManagement.isActive.active')
                        : t('app.feature.table.dishManagement.isActive.off');
                return <Badge status={status} text={typeName} />;
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
                let color = data === 0 ? 'green' : 'geekblue';
                let typeName =
                    data === 0
                        ? t('app.feature.table.dishManagement.typeName.food')
                        : t('app.feature.table.dishManagement.typeName.drink');
                return (
                    <Tag color={color} key={data}>
                        {typeName}
                    </Tag>
                );
            },
        },
        // {
        //     title: t('app.feature.table.dishManagement.action'),
        //     key: 'action',
        //     align: 'center',
        //     render: (_, record) => (
        //         <Space size='middle'>
        //             <Button type='text' onClick={() => handleEditClick(record)}>
        //                 {t('app.feature.table.dishManagement.button.edit')}
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];
};
