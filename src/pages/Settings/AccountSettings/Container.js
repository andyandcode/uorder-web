import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { hideLoading, showLoading } from '../../../components/FullPageLoading/LoadingSlice';
import { UseNotification, UserAction } from '../../../components/UseNotification';
import Config from '../../../configuration';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { getAccountSettingsAdmin, resetPasswordAdmin } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [editForm] = Form.useForm();
    const [settingsData, setSettingsData] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();
    const cookies = new Cookies();
    const [changePasswordForm] = Form.useForm();
    const [openChangePasswordModal, setOenChangePasswordModal] = useState(false);

    const cookieData = cookies.get(Config.storageKey.tokenKey) || [];

    const fetchData = async () => {
        dispatch(showLoading());
        try {
            await dispatch(getAccountSettingsAdmin(cookieData.data.id)).then((result) => {
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

    const handleChangePasswordClick = () => {
        setOenChangePasswordModal(true);
    };

    const handleChangeCancelClick = () => {
        setOenChangePasswordModal(false);
    };
    const handleChangePasswordCancelClick = () => {
        setOenChangePasswordModal(false);
    };
    const handleChangeSubmitClick = (data) => {
        console.log(data);
        changePasswordForm
            .validateFields()
            .then(async () => {
                messageApi.open(UseNotification.Message.InProgressMessage(t)).then(() => {
                    dispatch(resetPasswordAdmin(data)).then((result) => {
                        const status = Utils.getValues(result, 'payload.response.status', null);

                        if (status === 542) {
                            messageApi.open(UseNotification.Message.NotFoundAccountMessage(t));
                        }
                        if (status === 532) {
                            messageApi.open(UseNotification.Message.PasswordNotMatch(t));
                        }
                        if (status === 562) {
                            messageApi.open(UseNotification.Message.AccountLockedMessage(t));
                        }
                        console.log(result);
                        if (result.payload === 'ResetSuccessfully') {
                            messageApi
                                .open(
                                    UseNotification.Message.ChangePasswordSuccessful(t),
                                    setOenChangePasswordModal(false),
                                )
                                .then(() => changePasswordForm.resetFields());
                        }
                    });
                });
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
        messageContextHolder,
        cookieData,
        changePasswordForm,
        openChangePasswordModal,
        handleChangePasswordClick,
        handleChangeCancelClick,
        handleChangePasswordCancelClick,
        handleChangeSubmitClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
