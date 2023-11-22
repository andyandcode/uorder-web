import { Table } from 'antd';
import { NestedExpendedColumnSwitch } from './config';

const { Column } = Table;

export default function MainView(props) {
    const { t, columns, dataSource } = props;

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
                {columns.map((props, index) => {
                    return <Column key={index} {...props} />;
                })}
                {NestedExpendedColumnSwitch(props)}
            </Table>
        </>
    );
}
