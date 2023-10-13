import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Table } from 'antd';
import NestedExpendedConfig from '../NestedTable/config';
import TableColumns from './columnConfigs';

const { Column } = Table;

export default function MainView(props) {
    const {
        t,
        columns,
        dataSource,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        loadingTable,
    } = props;

    const menuSelection = (record) => {
        const process = () => {
            let menuArr = [
                {
                    label: t('app.feature.table.buttonColumn.delete'),
                    key: '1',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => handleActionButtonDeleteClick(record),
                },
            ];
            if (record.hasOwnProperty('isActive')) {
                if (record.isActive) {
                    menuArr.push({
                        label: t('app.feature.table.buttonColumn.turnOff'),
                        key: '2',
                        icon: <EyeInvisibleOutlined />,
                        onClick: () => handleActionButtonTurnOffClick(record),
                    });
                } else {
                    menuArr.push({
                        label: t('app.feature.table.buttonColumn.turnOn'),
                        key: '2',
                        icon: <EyeOutlined />,
                        onClick: () => handleActionButtonTurnOnClick(record),
                    });
                }
            }
            return menuArr;
        };

        return (
            <>
                <Menu items={process()} />
            </>
        );
    };

    return (
        <>
            <Table
                dataSource={dataSource}
                locale={{
                    emptyText: t('app.feature.table.emptyData'),
                    triggerDesc: t('app.feature.table.triggerDesc'),
                    triggerAsc: t('app.feature.table.triggerAsc'),
                    cancelSort: t('app.feature.table.cancelSort'),
                }}
                loading={loadingTable}
                expandable={{
                    expandedRowRender: (record) =>
                        TableColumns.expandedRowRenderSelection(t, record, props),
                    rowExpandable: (record) => NestedExpendedConfig(record),
                }}
            >
                {columns.map((props) => {
                    return <Column {...props} />;
                })}
                <Column
                    title={t('app.feature.table.actionColumn')}
                    key='action'
                    align='center'
                    render={(record) => (
                        <Space>
                            <Dropdown.Button
                                type='text'
                                dropdownRender={() => menuSelection(record)}
                                trigger={['click']}
                                onClick={() => handleActionButtonEditClick(record)}
                            >
                                {t('app.feature.table.buttonColumn.edit')}
                            </Dropdown.Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}
