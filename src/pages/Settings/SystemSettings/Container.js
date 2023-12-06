import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { UseNotification, UserAction } from '../../../components/UseNotification';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { getSystemSettingsAdmin, updateSystemSettingsAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [editForm] = Form.useForm();
    const [settingsData, setSettingsData] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getSystemSettingsAdmin()).then((result) => {
                editForm.setFieldsValue({ ...Utils.getValues(result, 'payload', []) });
                setSettingsData(Utils.getValues(result, 'payload', []));
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

    const handleDomainSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(async () => {
                        await dispatch(updateSystemSettingsAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                    })
                    .then(() => fetchData());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
            });
    };

    const containerProps = {
        ...props,
        history,
        t,
        editForm,
        settingsData,
        handleDomainSubmitClick,
        messageContextHolder,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
