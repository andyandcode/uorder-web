import MainView from './MainView';
import propsProvider from './PropsProvider';

function Conainer(props) {
    const { t } = props;
    const containerProps = {
        ...props,
        t,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
