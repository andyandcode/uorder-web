import { Modal as AntdModal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { notificationSelector } from '../../app/selector';

const DeleteModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.delete_action.title'),
        content: t('main.notification.table.delete_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.delete'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
        onOk: onOk,
    };
};

const TurnOffModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.turn_off_active_action.title'),
        content: t('main.notification.table.turn_off_active_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.turn_off'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
        onOk: onOk,
    };
};

const TurnOnModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.turn_on_active_action.title'),
        content: t('main.notification.table.turn_on_active_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.turn_on'),
        cancelText: t('main.components.button.cancel'),
        onOk: onOk,
    };
};

const InProgressMessage = (t) => {
    return {
        type: 'loading',
        content: t('main.notification.form.action_in_progress'),
        duration: 2.5,
    };
};

const FinishMessage = (t, action) => {
    return message.success(t(action), 2);
};

const FinishFailMessage = (t, action) => {
    return message.error(t(action), 2);
};

const NotFoundAccountMessage = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.not_found_account'),
        duration: 2,
    };
};

const WrongPasswordMessage = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.wrong_password'),
        duration: 2,
    };
};

const AccountLockedMessage = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.account_locked'),
        duration: 2,
    };
};

const CannotConnectToServer = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.cannnot_connect_to_server'),
        duration: 2,
    };
};

const LoginSuccessMessage = (t) => {
    return {
        type: 'success',
        content: t('main.notification.auth.login_success'),
        duration: 3,
    };
};

const PasswordNotMatch = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.password_not_match'),
        duration: 3,
    };
};

const ChangePasswordSuccessful = (t) => {
    return {
        type: 'success',
        content: t('main.notification.auth.change_password_successful'),
        duration: 3,
    };
};

const Modal = { DeleteModal, TurnOffModal, TurnOnModal };
const Message = {
    InProgressMessage,
    FinishMessage,
    FinishFailMessage,
    NotFoundAccountMessage,
    AccountLockedMessage,
    WrongPasswordMessage,
    LoginSuccessMessage,
    CannotConnectToServer,
    PasswordNotMatch,
    ChangePasswordSuccessful,
};

const Dish = 'main.common.system_key.dish';
const Menu = 'main.common.system_key.menu';
const Table = 'main.common.system_key.table';
const Account = 'main.common.system_key.account';

const CreateFinish = 'main.notification.form.create_finish';
const UpdateFinish = 'main.notification.form.edit_finish';
const CreateFinishFail = 'main.notification.form.create_finish_fail';
const UpdateFinishFail = 'main.notification.form.edit_finish_fail';

export const NotificationTarget = { Dish, Menu, Table, Account };

export const UserAction = { CreateFinish, UpdateFinish, CreateFinishFail, UpdateFinishFail };

export const UseNotification = { Modal, Message };

const NetworkError = (code, radom) => {
    const selector = useSelector(notificationSelector).content;
    const { t } = useTranslation();

    switch (selector) {
        case 123:
            AntdModal.confirm({
                title: 'This is a notification message',
                content: (
                    <div>
                        <p>some messages...some messages...</p>
                        <p>some messages...some messages...</p>
                    </div>
                ),
                onOk() {},
            });
            break;

        default:
            break;
    }
};

export const UseNotificationForAxios = { NetworkError };
