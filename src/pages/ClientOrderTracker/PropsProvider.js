export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        orderData,
        handlePayBookingClick,
        handleCallStaffClick,
        callStaffLoading,
        callStaffDisabled,
    } = props;
    return {
        history,
        dispatch,
        t,
        orderData,
        handlePayBookingClick,
        handleCallStaffClick,
        callStaffLoading,
        callStaffDisabled,
    };
}
