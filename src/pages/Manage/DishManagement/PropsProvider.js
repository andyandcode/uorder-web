export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        columns,
        data,
        getColumnSearchProps,
        enterLoading,
        loadings,
        handleEditClick,
        dataToEdit,
        openModel,
        handleCancelClick,
        handleSubmitClick,
    } = props;
    return {
        history,
        dispatch,
        t,
        columns,
        data,
        getColumnSearchProps,
        enterLoading,
        loadings,
        handleEditClick,
        dataToEdit,
        openModel,
        handleCancelClick,
        handleSubmitClick,
    };
}
