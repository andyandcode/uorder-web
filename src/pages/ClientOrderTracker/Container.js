import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { callStaffClient, getTracking, payBookingClient } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const [orderData, setOrderData] = useState([]);
    const params = useParams();
    const [callStaffLoading, setCallStaffLoading] = useState(false);
    const [callStaffDisabled, setCallStaffDisabled] = useState(false);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7297/bookingHub')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.start().catch((err) => console.error('SignalR Connection Error: ', err));

        connection.on('ReceiveOrderNotification', (message) => {
            dispatch(getTracking(params.tableId)).then((result) => {
                setOrderData(Utils.getValues(result, 'payload', []));
            });
        });

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        dispatch(getTracking(params.tableId)).then((result) => {
            setOrderData(Utils.getValues(result, 'payload', []));
        });
    }, [dispatch]);

    const handlePayBookingClick = async () => {
        await dispatch(payBookingClient(orderData.id)).then((result) => {
            window.location.replace(Utils.getValues(result, 'payload', []));
        });
    };

    const handleCallStaffClick = async (data) => {
        await dispatch(callStaffClient(orderData.tableId)).then((result) => {});
        setCallStaffLoading(true);
        setTimeout(() => {
            setCallStaffLoading(false);
            setCallStaffDisabled(true);
        }, 3000);
    };

    const containerProps = {
        ...props,
        history,
        t,
        location,
        orderData,
        handlePayBookingClick,
        handleCallStaffClick,
        callStaffLoading,
        callStaffDisabled,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
