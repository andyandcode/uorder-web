import { Form, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import TableColumns from '../../components/CustomTable/columnConfigs';
import { hideLoading, showLoading } from '../../components/FullPageLoading/LoadingSlice';
import { NotificationTarget, UseNotification } from '../../components/UseNotification';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import {
    createDiscountCodeAdmin,
    deleteDiscountCodeAdmin,
    getListDiscountCodeAdmin,
    undoDeleteDiscountAdmin,
    updateDiscountCodeAdmin,
} from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const columns = TableColumns.DiscountCodeColumns(t);
    const [tableData, setTableData] = useState([]);
    const [createForm] = Form.useForm();
    const [viewForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openViewModel, setOpenViewModel] = useState(false);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [deleteAlert, setDeleteAlert] = useState({ data: null, timestamp: 0 });
    const [viewData, setViewData] = useState();

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getListDiscountCodeAdmin()).then((result) => {
                setTableData(Utils.getValues(result, 'payload', []));
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const handleCreateCancelClick = () => {
        setOpenCreateModel(false);
    };
    const handleViewCancelClick = () => {
        setOpenViewModel(false);
    };

    const handleActionButtonViewClick = (data) => {
        setViewData(data);
        setOpenViewModel(true);
    };

    const handleUndoDeleteClick = async () => {
        await dispatch(undoDeleteDiscountAdmin(deleteAlert.data.id))
            .then(() => {
                setDeleteAlert({});
            })
            .then(() => fetchData());
    };

    const handleActionButtonDeleteClick = (data) => {
        async function onOk() {
            await dispatch(deleteDiscountCodeAdmin(data.id))
                .then((result) => {
                    const timestamp = Utils.getValues(result, 'payload', []);
                    setDeleteAlert({ data: data, timestamp: timestamp });
                })
                .then(() => {
                    fetchData();
                });
        }
        Modal.confirm(UseNotification.Modal.DeleteModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOffClick = (data) => {
        async function onOk() {
            await dispatch(
                updateDiscountCodeAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: false,
                        id: data.id,
                    },
                ]),
            ).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOffModal(t, NotificationTarget.Account, onOk));
    };

    const handleActionButtonTurnOnClick = (data) => {
        async function onOk() {
            await dispatch(
                updateDiscountCodeAdmin([
                    {
                        path: '/IsActive',
                        op: 'replace',
                        value: true,
                        id: data.id,
                    },
                ]),
            ).then(() => fetchData());
        }
        Modal.confirm(UseNotification.Modal.TurnOnModal(t, NotificationTarget.Account, onOk));
    };

    const handleCreateSubmitClick = (values) => {
        const rangeValue = values['expiryDate'];
        delete values.usePercentage;
        delete values.expiryDate;
        const minDate = new Date('0001-01-01T00:00:00.000Z');
        const maxDate = new Date('9999-12-31T23:59:59.999Z');
        createForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        const modifiedValues = {
                            ...values,
                            startDate: rangeValue ? rangeValue[0].format('MM/DD/YYYY') : minDate.toISOString(),
                            endDate: rangeValue ? rangeValue[1].format('MM/DD/YYYY') : maxDate.toISOString(),
                            discount: values.discount !== undefined ? Utils.convertToNumber(values.discount) : 0,
                            maxDiscountAmount:
                                values.maxDiscountAmount !== undefined
                                    ? Utils.convertToNumber(values.maxDiscountAmount)
                                    : 0,
                            minDiscountAmount:
                                values.minDiscountAmount !== undefined
                                    ? Utils.convertToNumber(values.minDiscountAmount)
                                    : 0,
                            percentage: values.percentage !== undefined ? Utils.convertToNumber(values.percentage) : 0,
                            minOrderAmountRequired:
                                values.minOrderAmountRequired !== undefined
                                    ? Utils.convertToNumber(values.minOrderAmountRequired)
                                    : 0,
                            applicableProductIds:
                                values.applicableProductIds !== undefined ? values.applicableProductIds : null,
                        };
                        await dispatch(createDiscountCodeAdmin(modifiedValues)).then(() => {
                            UseNotification.Message.CreateFinish(t);
                            setOpenCreateModel(false);
                            fetchData();
                        });
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                UseNotification.Message.CreateFinishFail(t);
            });
    };

    const handleCreateNewClick = () => {
        setOpenCreateModel(true);
    };

    const handleRefreshClick = (index) => {
        fetchData();
    };

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        tableData,
        openCreateModel,
        openViewModel,
        createForm,
        viewForm,
        messageContextHolder,
        handleActionButtonViewClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleCreateCancelClick,
        handleCreateNewClick,
        handleRefreshClick,
        viewData,
        handleViewCancelClick,
        deleteAlert,
        handleUndoDeleteClick,
        setDeleteAlert,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
