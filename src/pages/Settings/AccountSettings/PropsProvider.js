export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        editForm,
        settingsData,
        messageContextHolder,
        cookieData,
        changePasswordForm,
        openChangePasswordModal,
        handleChangeSubmitClick,
        handleChangeCancelClick,
        handleChangePasswordClick,
        handleChangePasswordCancelClick,
    } = props;
    return {
        history,
        dispatch,
        t,
        editForm,
        settingsData,
        messageContextHolder,
        cookieData,
        changePasswordForm,
        openChangePasswordModal,
        handleChangeSubmitClick,
        handleChangeCancelClick,
        handleChangePasswordClick,
        handleChangePasswordCancelClick,
    };
}
