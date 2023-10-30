export default function propsProvider(props) {
    const { history, dispatch, t, handleLoginSubmitClick } = props;
    return {
        history,
        dispatch,
        t,
        handleLoginSubmitClick,
    };
}
