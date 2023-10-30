import React from 'react';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;

    const handleLoginSubmitClick = (e) => {};

    const containerProps = {
        ...props,
        history,
        t,
        handleLoginSubmitClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
