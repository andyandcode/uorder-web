import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import propsProvider from './PropsProvier';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            setLoadingTable(false);
        }, 500);
    }, [dispatch]);

    const getNewTableData = () => {
        setLoadingTable(true);
        setTimeout(() => {
            setLoadingTable(false);
        }, 500);
    };

    const handleRefreshClick = (index) => {
        setLoadingsRefreshButton((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            setLoadingTable(true);
            return newLoadings;
        });
        setTimeout(() => {
            setLoadingsRefreshButton((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;

                setLoadingTable(false);
                return newLoadings;
            });
        }, 1000);
    };

    const containerProps = {
        ...props,
        history,
        t,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
