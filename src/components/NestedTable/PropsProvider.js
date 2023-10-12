export default function propsProvider(props) {
    const {
        t,
        columns,
        dataSource,
        locale,
        expandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
    } = props;
    return {
        t,
        columns,
        dataSource,
        locale,
        expandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
    };
}
