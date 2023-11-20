export default function propsProvider(props) {
    const { history, dispatch, t, handleLoginSubmitClick, loginForm, contextHolder } = props;
    return {
        history,
        dispatch,
        t,
        handleLoginSubmitClick,
        loginForm,
        contextHolder,
    };
}
