import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { getTracking } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location, dispatch } = props;
    const [orderData, setOrderData] = useState([]);
    const params = useParams();

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
