export default function propsProvider(props) {
    const { history, dispatch, t, orderData, handlePayBookingClick, handleCallStaffClick } = props;
    return {
        history,
        dispatch,
        t,
        orderData,
        handlePayBookingClick,
        handleCallStaffClick,
    };
}
