export default function propsProvider(props) {
    const {
        t,
        columns,
        dataSource,
        locale,
        ExpandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        switchActionColumn,
        parentData,
    } = props;
    return {
        t,
        columns,
        dataSource,
        locale,
        ExpandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        switchActionColumn,
        parentData,
    };
}
