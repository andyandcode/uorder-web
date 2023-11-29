import { Form, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import TableColumns from '../../components/CustomTable/columnConfigs';
import { NotificationTarget, UseNotification, UserAction } from '../../components/UseNotification';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import {
    createAccountAdmin,
    deleteAccountAdmin,
    getListAccountAdmin,
    updateAccountAdmin,
    updateAccountStatusAdmin,
} from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.AccountColumns(t);
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);
    const [loadingsRefreshButton, setLoadingsRefreshButton] = useState([]);

    useEffect(() => {
        setLoadingTable(true);
        setTimeout(() => {
            dispatch(getListAccountAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
            setLoadingTable(false);
        }, 500);
    }, [dispatch]);

    const getNewTableData = () => {
        setLoadingTable(true);
        dispatch(getListAccountAdmin())
            .then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            })
            .then(setLoadingTable(false));
    };

    const handleEditCancelClick = () => {
        setOpenEditModel(false);
    };

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };

    const handleActionButtonEditClick = (data) => {
        editForm.setFieldsValue({ ...data });
        setOpenEditModel(true);
    };

    const handleActionButtonDeleteClick = (data) => {
        function onOk() {
            dispatch(deleteAccountAdmin(data.id));
            getNewTableData();
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        function onOk() {
            dispatch(
                updateAccountStatusAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: false,
                        id: data.id,
                    },
                ]),
            ).then(getNewTableData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        function onOk() {
            dispatch(
                updateAccountStatusAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: true,
                        id: data.id,
                    },
                ]),
            ).then(getNewTableData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Account, onOk));
    };

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                console.log('Created: ', values);
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        dispatch(createAccountAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.CreateFinish);
                        setOpenCreateModel(false);
                        getNewTableData();
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.CreateFinishFail);
            });
    };

    const handleEditSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                console.log('Edited: ', values);
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        const result = dispatch(updateAccountAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                        setOpenEditModel(false);
                        getNewTableData();
                    })
                    .then(() => editForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
            });
    };

    const handleCreateNewClick = () => {
        setOpenCreateModel(true);
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
        columns,
        tableData,
        openCreateModel,
        openEditModel,
        createForm,
        editForm,
        messageContextHolder,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        loadingTable,
        loadingsRefreshButton,
        handleCreateNewClick,
        handleRefreshClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
