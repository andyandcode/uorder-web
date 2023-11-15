export default function propsProvider(props) {
    const { history, dispatch, t, orderData } = props;
    return {
        history,
        dispatch,
        t,
        orderData,
    };
}
