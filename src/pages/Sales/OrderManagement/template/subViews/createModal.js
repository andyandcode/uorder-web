import { Modal } from 'antd';
import React from 'react';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function CreateModal({
    t,
    createForm,
    openCreateModel,
    handleCreateCancelClick,
    handleCreateSubmitClick,
    messageContextHolder,
}) {
    const target = t('main.common.system_key.order');

    return (
        <>
            <Modal
                open={openCreateModel}
                title={t('main.entities.form_create_title', {
                    target: target,
                })}
                onCancel={handleCreateCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='50%'
            >
                {messageContextHolder}
                <FormBuilder.CreateNewOrderForm
                    form={createForm}
                    handleButtonSubmit={handleCreateSubmitClick}
                    handleButtonCancel={handleCreateCancelClick}
                />
            </Modal>
        </>
    );
}
