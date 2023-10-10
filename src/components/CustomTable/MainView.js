import { Button, Table } from 'antd';
const { Column } = Table;

export default function MainView(props) {
    const { t, columns, dataSource, onClick } = props;
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
                        <Button type='text' onClick={() => onClick(record)}>
                            {t('app.feature.table.buttonColumn.edit')}
                        </Button>
                    )}
                />
            </Table>
        </>
    );
}
