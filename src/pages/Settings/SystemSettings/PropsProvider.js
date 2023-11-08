export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        editForm,
        settingsData,
        handleDomainSubmitClick,
        handleChiefCountSubmitClick,
        messageContextHolder,
    } = props;
    return {
        history,
        dispatch,
        t,
        editForm,
        settingsData,
        handleDomainSubmitClick,
        handleChiefCountSubmitClick,
        messageContextHolder,
    };
}
