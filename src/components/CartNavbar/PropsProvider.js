export default function propsProvider(props) {
    const { history, dispatch, t, isShowNavbar, orderResult, handleViewOrderClick } = props;
    return {
        history,
        dispatch,
        t,
        isShowNavbar,
        orderResult,
        handleViewOrderClick,
    };
}
