import { useEffect, useState } from 'react';
import { DishColumns } from '../../../components/CustomTable/columnConfigs';
import DishData from '../../../database/dish.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dataToEdit } = props;
    const columns = DishColumns(props);
    const data = DishData;

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 1000);
    };

    useEffect(() => {
        console.log(dataToEdit);
    }, [dataToEdit]);

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        data,
        loadings,
        enterLoading,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
