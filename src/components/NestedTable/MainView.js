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
                    emptyText: t('app.feature.table.emptyData'),
                    triggerDesc: t('app.feature.table.triggerDesc'),
                    triggerAsc: t('app.feature.table.triggerAsc'),
                    cancelSort: t('app.feature.table.cancelSort'),
                }}
                size='small'
            >
                {columns.map((props) => {
                    return <Column {...props} />;
                })}
                <Column
                    title={t('app.feature.table.actionColumn')}
                    key='action'
                    align='center'
                    render={(record) => (
                        <Space wrap size={'small'}>
                            <Popconfirm
                                title={t('app.notification.table.popConfirm.quickTurnOff.title')}
                                description={t(
                                    'app.notification.table.popConfirm.quickTurnOff.content',
                                    { target: t('app.common.systemKey.dish') },
                                )}
                                onConfirm={() => handleQuickTurnOffConfirm(record)}
                                okText={t(
                                    'app.notification.table.popConfirm.quickTurnOff.acceptButton',
                                )}
                                cancelText={t('app.notification.table.cancelButton')}
                            >
                                <Button
                                    disabled={record.isActive ? false : true}
                                    size='small'
                                    type='link'
                                >
                                    {t('app.feature.table.buttonColumn.turnOff')}
                                </Button>
                            </Popconfirm>
                            <Button
                                disabled={record.isActive ? true : false}
                                size='small'
                                type='link'
                                onClick={() => handleQuickActionButtonTurnOnClick(record)}
                            >
                                {t('app.feature.table.buttonColumn.turnOn')}
                            </Button>
                            <Popconfirm
                                title={t('app.notification.table.popConfirm.quickDelete.title', {
                                    target: t('app.common.systemKey.dish'),
                                })}
                                description={t(
                                    'app.notification.table.popConfirm.quickDelete.content',
                                    { target: t('app.common.systemKey.dish') },
                                )}
                                onConfirm={() => handleQuickDeleteConfirm(record)}
                                okText={t(
                                    'app.notification.table.popConfirm.quickDelete.acceptButton',
                                )}
                                cancelText={t('app.notification.table.cancelButton')}
                                okType='danger'
                            >
                                <Button danger size='small' type='link'>
                                    {t('app.feature.table.buttonColumn.delete')}
                                </Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}
