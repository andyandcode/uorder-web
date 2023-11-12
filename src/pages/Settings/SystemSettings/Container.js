import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        dispatch(getSystemSettingsAdmin())
            .then((result) => {
                editForm.setFieldsValue({ ...Utils.getValues(result, 'payload', []) });
                setSettingsData(Utils.getValues(result, 'payload', []));
            })
            .then();
    }, [dispatch, editForm]);

    const getNewData = () => {
        dispatch(getSystemSettingsAdmin()).then((result) => {
            editForm.setFieldsValue({ ...Utils.getValues(result, 'payload', []) });
            setSettingsData(Utils.getValues(result, 'payload', []));
        });
    };

    const handleDomainSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        dispatch(updateSystemSettingsAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                    })
                    .then();
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
            });
    };
    const handleChefCountSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        dispatch(updateSystemSettingsAdmin(values));
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                    })
                    .then();
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
        handleChefCountSubmitClick,
        messageContextHolder,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
