import { message } from 'antd';

const DeleteModal = (t, target) => {
    return {
        title: t('main.notification.table.delete_action.title'),
        content: t('main.notification.table.delete_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.delete'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
    };
};

const TurnOffModal = (t, target) => {
    return {
        title: t('main.notification.table.turn_off_active_action.title'),
        content: t('main.notification.table.turn_off_active_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.turn_off'),
        cancelText: t('main.components.button.cancel'),
        okType: 'danger',
    };
};

const TurnOnModal = (t, target) => {
    return {
        title: t('main.notification.table.turn_on_active_action.title'),
        content: t('main.notification.table.turn_on_active_action.content', {
            target: t(target),
        }),
        okText: t('main.components.button.turn_on'),
        cancelText: t('main.components.button.cancel'),
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

const Modal = { DeleteModal, TurnOffModal, TurnOnModal };
const Message = { InProgressMessage, FinishMessage, FinishFailMessage };

const Dish = 'main.common.system_key.dish';
const Menu = 'main.common.system_key.menu';
const Table = 'main.common.system_key.table';

const CreateFinish = 'main.notification.form.create_finish';
const UpdateFinish = 'main.notification.form.edit_finish';
const CreateFinishFail = 'main.notification.form.create_finish_fail';
const UpdateFinishFail = 'main.notification.form.edit_finish_fail';

export const NotificationTarget = { Dish, Menu, Table };

export const UserAction = { CreateFinish, UpdateFinish, CreateFinishFail, UpdateFinishFail };

export const UseNotification = { Modal, Message };
