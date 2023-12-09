export default function propsProvider(props) {
    const { history, dispatch, t, bookingData, handleTrackBookingClick } = props;
    return {
        history,
        dispatch,
        t,
        bookingData,
        handleTrackBookingClick,
    };
}
