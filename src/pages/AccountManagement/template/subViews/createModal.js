import { Modal } from 'antd';
import React from 'react';
import { FormBuilder } from '../../../../components/FormBuilder';

export default function CreateModal({
    t,
    createForm,
    openCreateModel,
    handleCreateCancelClick,
    messageContextHolder,
    handleCreateSubmitClick,
}) {
    const target = t('main.common.system_key.account');

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
            >
                {messageContextHolder}
                <FormBuilder.CreateNewAccountForm
                    form={createForm}
                    handleButtonSubmit={handleCreateSubmitClick}
                    handleButtonCancel={handleCreateCancelClick}
                />
            </Modal>
        </>
    );
}
