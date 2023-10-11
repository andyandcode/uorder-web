import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Table } from 'antd';

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
    } = props;

    const menuSelection = (record, selection) => {
        const process = () => {
            if (record.hasOwnProperty('isActive')) {
                switch (selection) {
                    case 'dish':
                        if (record.isActive) {
                            return (
                                <>
                                    <Menu.Item
                                        icon={<EyeOutlined />}
                                        onClick={() => handleActionButtonTurnOffClick(record)}
                                    >
                                        {t('app.feature.table.buttonColumn.turnOff')}
                                    </Menu.Item>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <Menu.Item
                                        icon={<EyeOutlined />}
                                        onClick={() => handleActionButtonTurnOnClick(record)}
                                    >
                                        {t('app.feature.table.buttonColumn.turnOn')}
                                    </Menu.Item>
                                </>
                            );
                        }
                    default:
                        break;
                }
                return <></>;
            }
        };

        return (
            <>
                <Menu>
                    <Menu.Item
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleActionButtonDeleteClick(record)}
                    >
                        {t('app.feature.table.buttonColumn.delete')}
                    </Menu.Item>
                    {process()}
                </Menu>
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
            >
                <Column
                    title={t('app.feature.table.noColumn')}
                    key='no'
                    align='center'
                    render={(id, record, index) => {
                        ++index;
                        return index;
                    }}
                />
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
                                overlay={menuSelection(record, 'dish')}
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
