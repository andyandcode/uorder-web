import { Form, message } from 'antd';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { UseNotification } from '../../../components/UseNotification';
import Config from '../../../configuration';
import { rootKeys } from '../../../configuration/routesConfig';
import Utils from '../../../utilities';
import propsProvider from './PropsProvider';
import { login } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [loginForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const cookies = new Cookies();
    const [loginBtnLoading, setLoginBtnLoading] = useState([]);

    const handleLoginSubmitClick = (data) => {
        setLoginBtnLoading((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        loginForm
            .validateFields()
            .then(async () => {
                await dispatch(login(data)).then((result) => {
                    if (result.payload === 'ERR_NETWORK') {
                        messageApi.open(UseNotification.Message.CannotConnectToServer(t));
                    }

                    const status = Utils.getValues(result, 'payload.response.status', null);

                    if (status === 542) {
                        messageApi.open(UseNotification.Message.NotFoundAccountMessage(t));
                    }
                    if (status === 492) {
                        messageApi.open(UseNotification.Message.WrongPasswordMessage(t));
                    }
                    if (status === 562) {
                        messageApi.open(UseNotification.Message.AccountLockedMessage(t));
                    }

                    if (result.payload.token) {
                        messageApi
                            .open(UseNotification.Message.LoginSuccessMessage(t))
                            .then(() => {
                                const decodedToken = jwt_decode(result.payload.token);
                                cookies.set(
                                    Config.storageKey.tokenKey,
                                    { data: decodedToken, key: result.payload.token },
                                    {
                                        maxAge: parseInt(decodedToken.maxa),
                                        secure: true,
                                    },
                                );
                                history(rootKeys.homeUrl);
                            })
                            .then(() => {});
                    }
                    setLoginBtnLoading((prevLoadings) => {
                        const newLoadings = [...prevLoadings];
                        newLoadings[0] = false;
                        return newLoadings;
                    });
                });
            })
            .catch(() => {});
    };

    const containerProps = {
        ...props,
        history,
        t,
        handleLoginSubmitClick,
        loginForm,
        contextHolder,
        loginBtnLoading,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
