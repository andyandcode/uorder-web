import React from 'react';
import MainView from './MainView';
import propsProvider from './PropsProvider';

function Conainer(props) {
    const { history, t } = props;

    const containerProps = {
        ...props,
        history,
        t,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
