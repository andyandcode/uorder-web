import { useEffect, useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import CurrentBooking from '../../../database/currentBooking.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;
    const data = CurrentBooking;
    const [currentBookingData, setCurrentBookingData] = useState([]);
    const [cardLoading, setCardLoading] = useState(true);
    const [openViewModel, setOpenViewModel] = useState(false);
    const [viewData, setViewData] = useState();
    const columns = TableColumns.OrderColumns(t);

    useEffect(() => {
        setCurrentBookingData(data);
        setInterval(() => {
            setCardLoading(false);
        }, 500);
    }, [data]);

    const handlePrintBillClick = (data) => {};

    const handleViewBookingDetailClick = (data) => {
        setViewData(data);
        setOpenViewModel(true);
    };

    const handlePayBillClick = (data) => {};

    const handleCompleteOrderClick = (data) => {};

    const handleViewCancelClick = () => {
        setOpenViewModel(false);
    };

    const containerProps = {
        ...props,
        history,
        t,
        currentBookingData,
        handlePrintBillClick,
        handleViewBookingDetailClick,
        handlePayBillClick,
        cardLoading,
        handleCompleteOrderClick,
        openViewModel,
        viewData,
        handleViewCancelClick,
        columns,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
