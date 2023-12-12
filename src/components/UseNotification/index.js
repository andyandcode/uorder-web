import { message } from 'antd';

const DeleteModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.delete_action.title'),
        content: t('main.notification.table.delete_action.content'),
        okText: t('main.components.button.delete'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
        onOk: onOk,
    };
};

const TurnOffModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.turn_off_active_action.title'),
        content: t('main.notification.table.turn_off_active_action.content'),
        okText: t('main.components.button.turn_off'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
        onOk: onOk,
    };
};

const TurnOnModal = (t, target, onOk) => {
    return {
        title: t('main.notification.table.turn_on_active_action.title'),
        content: t('main.notification.table.turn_on_active_action.content'),
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

const CreateFinish = (t) => {
    return message.success(t('main.notification.form.create_finish'), 2);
};
const UpdateFinish = (t) => {
    return message.success(t('main.notification.form.edit_finish'), 2);
};

const CreateFinishFail = (t) => {
    return message.error(t('main.notification.form.create_finish_fail'), 2);
};

const UpdateFinishFail = (t) => {
    return message.error(t('main.notification.form.edit_finish_fail'), 2);
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
        duration: 2,
    };
};

const PasswordNotMatch = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.password_not_match'),
        duration: 2,
    };
};

const UsernameExists = (t) => {
    return {
        type: 'error',
        content: t('main.notification.auth.username_exists'),
        duration: 2,
    };
};

const ChangePasswordSuccessful = (t) => {
    return {
        type: 'success',
        content: t('main.notification.auth.change_password_successful'),
        duration: 2,
    };
};

const Modal = { DeleteModal, TurnOffModal, TurnOnModal };
const Message = {
    InProgressMessage,
    NotFoundAccountMessage,
    AccountLockedMessage,
    WrongPasswordMessage,
    LoginSuccessMessage,
    CannotConnectToServer,
    PasswordNotMatch,
    ChangePasswordSuccessful,
    UsernameExists,
    CreateFinish,
    UpdateFinish,
    CreateFinishFail,
    UpdateFinishFail,
};

const Dish = 'main.common.system_key.dish';
const Menu = 'main.common.system_key.menu';
const Table = 'main.common.system_key.table';
const Account = 'main.common.system_key.account';

export const NotificationTarget = { Dish, Menu, Table, Account };

export const UseNotification = { Modal, Message };
