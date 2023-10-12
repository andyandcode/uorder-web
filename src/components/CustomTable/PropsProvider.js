export default function propsProvider(props) {
    const {
        t,
        columns,
        dataSource,
        locale,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        expandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        loadingTable,
    } = props;
    return {
        t,
        columns,
        dataSource,
        locale,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        expandedRowRenderSelection,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        loadingTable,
    };
}
