import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propsProvider from './PropsProvider';
import { updateBookingStatusClient } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const params = useParams();
    const [orderData, setOrderData] = useState(location.state != null ? location.state.data : []);
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
        );
    }, [dispatch]);

    const containerProps = {
        ...props,
        history,
        t,
        location,
        orderData,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
