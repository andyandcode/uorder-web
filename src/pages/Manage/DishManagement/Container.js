import { useState } from 'react';
import { DishColumns } from '../../../components/CustomTable/columnConfigs';
import DishData from '../../../database/dish.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dataToEdit } = props;
    const columns = DishColumns(props);
    const data = DishData;

    const [openModel, setOpenModel] = useState(false);

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
                setOpenModel(true);
                return newLoadings;
            });
        }, 1000);
    };

    const handleCancelClick = () => {
        setOpenModel(false);
    };

    const handleSubmitClick = (values) => {
        console.log('Received values of form: ', values);
        setOpenModel(false);
    };

    const handleEditClick = (data) => {
        console.log(data);
    };

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        data,
        loadings,
        openModel,
        enterLoading,
        handleCancelClick,
        handleSubmitClick,
        handleEditClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
