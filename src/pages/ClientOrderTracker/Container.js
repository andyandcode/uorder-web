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
