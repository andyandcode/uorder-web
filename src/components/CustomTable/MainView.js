import { Table } from 'antd';
import NestedExpendedConfig from '../NestedTable/config';
import { ColumnBuilder } from './ColumnBuilder';
import TableColumns from './columnConfigs';

const { Column } = Table;
const { ActionColumn, ExtraColumnBuilder } = ColumnBuilder;

export default function MainView(props) {
    const {
        t,
        columns,
        dataSource,
        loadingTable,
        extraColumns,
        switchActionColumn,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        handleQuickTurnOffConfirm,
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
                loading={loadingTable}
                expandable={{
                    expandedRowRender: (record) =>
                        TableColumns.ExpandedRowRenderSelection(
                            record,
                            t,
                            switchActionColumn,
                            handleQuickActionButtonTurnOnClick,
                            handleQuickDeleteConfirm,
                            handleQuickTurnOffConfirm,
                        ),
                    rowExpandable: (record) => NestedExpendedConfig(record, switchActionColumn),
                }}
            >
                {columns.map((props) => {
                    return <Column {...props} />;
                })}
                {ExtraColumnBuilder(props, extraColumns)}
                {ActionColumn(props, switchActionColumn)}
            </Table>
        </>
    );
}
