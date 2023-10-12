import { Form, message, Modal } from 'antd';
import React, { useState } from 'react';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import DishData from '../../../database/dish.json';
import propsProvider from './PropsProvider';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t } = props;
    const columns = TableColumns.DishColumns(t);
    const expandedRowRenderSelection = TableColumns.expandedRowRenderSelection;
    const data = DishData;
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();

    const draggerFileProps = {
        name: 'file',
        multiple: true,
        maxCount: 8,
        accept: 'image/png, image/jpeg',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;

                setOpenCreateModel(true);
                return newLoadings;
            });
        }, 1000);
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
        Modal.confirm({
            title: t('app.notification.table.deleteAction.title'),
            content: t('app.notification.table.deleteAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.deleteAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
            okType: 'danger',
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOffClick = (data) => {
        Modal.confirm({
            title: t('app.notification.table.turnOffActiveAction.title'),
            content: t('app.notification.table.turnOffActiveAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.turnOffActiveAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
            okType: 'danger',
            onOk() {},
            onCancel() {},
        });
    };

    const handleActionButtonTurnOnClick = (data) => {
        Modal.confirm({
            title: t('app.notification.table.turnOnActiveAction.title'),
            content: t('app.notification.table.turnOnActiveAction.content', {
                target: t('app.common.systemKey.dish'),
            }),
            okText: t('app.notification.table.turnOnActiveAction.acceptButton'),
            cancelText: t('app.notification.table.cancelButton'),
            onOk() {},
            onCancel() {},
        });
    };

    const handleCreateSubmitClick = (values) => {
        createForm
            .validateFields()
            .then(() => {
                console.log('Created: ', values);
                messageApi
                    .open({
                        type: 'loading',
                        content: t('app.notification.form.actionInProgress'),
                        duration: 2.5,
                    })
                    .then(() => {
                        message.success(t('app.notification.form.createFinish'), 2);
                        setOpenCreateModel(false);
                    })
                    .then(() => createForm.resetFields());
            })
            .catch(() => {
                message.error(t('app.notification.form.createFinishFail'), 2);
            });
    };

    const handleEditSubmitClick = (values) => {
        editForm
            .validateFields()
            .then(() => {
                console.log('Edited: ', values);
                messageApi
                    .open({
                        type: 'loading',
                        content: t('app.notification.form.actionInProgress'),
                        duration: 2.5,
                    })
                    .then(() => {
                        message.success(t('app.notification.form.editFinish'), 2);
                        setOpenEditModel(false);
                    })
                    .then(() => editForm.resetFields());
            })
            .catch(() => {
                message.error(t('app.notification.form.editFinishFail'), 2);
            });
    };

    const containerProps = {
        ...props,
        history,
        t,
        columns,
        data,
        loadings,
        openCreateModel,
        openEditModel,
        createForm,
        editForm,
        messageContextHolder,
        draggerFileProps,
        enterLoading,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditCancelClick,
        handleCreateCancelClick,
        expandedRowRenderSelection,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
