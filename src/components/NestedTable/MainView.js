import { Button, Popconfirm, Space, Table } from 'antd';

const { Column } = Table;

export default function MainView(props) {
    const {
        t,
        columns,
        dataSource,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
    } = props;

    return (
        <>
            <Table
                dataSource={dataSource}
                locale={{
                    emptyText: t('main.components.table.empty_data'),
                    triggerDesc: t('main.components.table.trigger_desc'),
                    triggerAsc: t('main.components.table.trigger_asc'),
                    cancelSort: t('main.components.button.cancel'),
                }}
                size='small'
            >
                {columns.map((props) => {
                    return <Column {...props} />;
                })}
                <Column
                    title={t('main.components.table.action_column')}
                    key='action'
                    align='center'
                    render={(record) => (
                        <Space wrap size={'small'}>
                            <Popconfirm
                                title={t(
                                    'main.notification.table.pop_confirm.quick_turn_off.title',
                                )}
                                description={t(
                                    'main.notification.table.pop_confirm.quick_turn_off.content',
                                    { target: t('main.common.system_key.dish') },
                                )}
                                onConfirm={() => handleQuickTurnOffConfirm(record)}
                                okText={t('main.components.button.turn_off')}
                                cancelText={t('main.components.button.cancel')}
                            >
                                <Button
                                    disabled={record.isActive ? false : true}
                                    size='small'
                                    type='link'
                                >
                                    {t('main.components.button.turn_off')}
                                </Button>
                            </Popconfirm>
                            <Button
                                disabled={record.isActive ? true : false}
                                size='small'
                                type='link'
                                onClick={() => handleQuickActionButtonTurnOnClick(record)}
                            >
                                {t('main.components.button.turn_on')}
                            </Button>
                            <Popconfirm
                                title={t('main.notification.table.pop_confirm.quick_delete.title', {
                                    target: t('main.common.system_key.dish'),
                                })}
                                description={t(
                                    'main.notification.table.pop_confirm.quick_delete.content',
                                    { target: t('main.common.system_key.dish') },
                                )}
                                onConfirm={() => handleQuickDeleteConfirm(record)}
                                okText={t('main.components.button.delete')}
                                cancelText={t('main.components.button.cancel')}
                                okType='danger'
                            >
                                <Button danger size='small' type='link'>
                                    {t('main.components.button.delete')}
                                </Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}
