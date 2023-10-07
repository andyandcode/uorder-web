import propsProvider from './DishPropsProvider';
import DishMainView from './template/DishMainView';

function DishConainer(props) {
    const { history } = props;

    const containerProps = {
        ...props,
        history,
    };
    return <DishMainView {...propsProvider(containerProps)} />;
}

export default DishConainer;
