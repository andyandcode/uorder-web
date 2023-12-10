import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rootKeys } from '../../configuration/routesConfig';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { getBookingByIdClient, updateBookingStatusClient } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const params = useParams();
    const [orderData, setOrderData] = useState(location.state != null ? location.state.data : []);
    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        dispatch(
            updateBookingStatusClient([
                {
                    path: '/PaymentStatus',
                    op: 'replace',
                    value: 0,
                    id: params.orderId,
                },
            ]),
        ).then(() => {});
        dispatch(getBookingByIdClient(params.orderId)).then((result) => {
            setBookingData(Utils.getValues(result, 'payload', []));
        });
    }, [dispatch]);

    const handleTrackBookingClick = () => {
        history(rootKeys.clientOrderTrackerRootUrl + bookingData.tableId);
    };

    const containerProps = {
        ...props,
        history,
        t,
        location,
        orderData,
        bookingData,
        handleTrackBookingClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
