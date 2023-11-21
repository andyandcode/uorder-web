export default function propsProvider(props) {
    const { history, dispatch, t, handleLoginSubmitClick, loginForm, contextHolder, loginBtnLoading } = props;
    return {
        history,
        dispatch,
        t,
        handleLoginSubmitClick,
        loginForm,
        contextHolder,
        loginBtnLoading,
    };
}
