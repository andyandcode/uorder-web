import propsProvider from './PropsProvider';
import MainView from './template/MainView';

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
