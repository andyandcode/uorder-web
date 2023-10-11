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
    };
}
