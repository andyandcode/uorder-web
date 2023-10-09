import { Table } from 'antd';

export default function MainView(props) {
    const { t, columns, dataSource } = props;
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                locale={{
                    emptyText: t('app.feature.table.emptyData'),
                    triggerDesc: t('app.feature.table.triggerDesc'),
                    triggerAsc: t('app.feature.table.triggerAsc'),
                    cancelSort: t('app.feature.table.cancelSort'),
                }}
            />
        </>
    );
}
