import React, { useState } from 'react';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, location } = props;
    const [orderData, setOrderData] = useState(location.state != null ? location.state.data : []);

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
