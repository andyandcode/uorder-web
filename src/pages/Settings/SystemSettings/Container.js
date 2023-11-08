import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { UseNotification, UserAction } from '../../../components/UseNotification';
import pageData from '../../../database/systemSettings.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [editForm] = Form.useForm();
    const [settingsData, setSettingsData] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();

    useEffect(() => {
        setSettingsData(pageData[0]);
        editForm.setFieldsValue({ ...settingsData });
    }, [settingsData, editForm]);

    const getNewData = () => {
        setSettingsData(pageData[0]);
        editForm.setFieldsValue({ ...settingsData });
    };

    const handleDomainSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        console.log('Edited: ', values);
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                    })
                    .then(() => getNewData());
            })
            .catch(() => {
                UseNotification.Message.FinishFailMessage(t, UserAction.UpdateFinishFail);
            });
    };
    const handleChiefCountSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                messageApi
                    .open(UseNotification.Message.InProgressMessage(t))
                    .then(() => {
                        console.log('Edited: ', values);
                        UseNotification.Message.FinishMessage(t, UserAction.UpdateFinish);
                    })
                    .then(() => getNewData());
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
        handleChiefCountSubmitClick,
        messageContextHolder,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
