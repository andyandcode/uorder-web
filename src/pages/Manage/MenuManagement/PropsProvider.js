export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        columns,
        tableData,
        getColumnSearchProps,
        enterLoading,
        loadings,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        dataToEdit,
        openCreateModel,
        openEditModel,
        handleCancelClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        createForm,
        editForm,
        initialValuesInEditForm,
        handleEditCancelClick,
        handleCreateCancelClick,
        messageContextHolder,
        draggerFileProps,
        ExpandedRowRenderSelection,
        dishData,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        loadingTable,
        handleRefreshDataClick,
        loadingsRefreshButton,
        handleCreateNewClick,
        handleRefreshClick,
        switchActionColumn,
        handleUndoDeleteClick,
        deleteAlert,
        setDeleteAlert,
    } = props;
    return {
        history,
        dispatch,
        t,
        columns,
        tableData,
        getColumnSearchProps,
        enterLoading,
        loadings,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        dataToEdit,
        openCreateModel,
        openEditModel,
        handleCancelClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        createForm,
        editForm,
        initialValuesInEditForm,
        handleEditCancelClick,
        handleCreateCancelClick,
        messageContextHolder,
        draggerFileProps,
        ExpandedRowRenderSelection,
        dishData,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        loadingTable,
        handleRefreshDataClick,
        loadingsRefreshButton,
        handleCreateNewClick,
        handleRefreshClick,
        switchActionColumn,
        handleUndoDeleteClick,
        deleteAlert,
        setDeleteAlert,
    };
}
