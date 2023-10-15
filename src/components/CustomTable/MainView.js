import { Table } from 'antd';
import NestedExpendedConfig from '../NestedTable/config';
import { ColumnBuilder } from './ColumnBuilder';
import TableColumns from './columnConfigs';

const { Column } = Table;
const { ActionColumn, ExtraColumnBuilder } = ColumnBuilder;

export default function MainView(props) {
    const { t, columns, dataSource, loadingTable, extraColumns } = props;
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
                {ExtraColumnBuilder(props, extraColumns)}
                {ActionColumn(props)}
            </Table>
        </>
    );
}
