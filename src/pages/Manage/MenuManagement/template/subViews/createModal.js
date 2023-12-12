import { Modal } from 'antd';
import React from 'react';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function CreateModal({
    t,
    createForm,
    openCreateModel,
    handleCreateCancelClick,
    messageContextHolder,
    dishData,
    handleCreateSubmitClick,
}) {
    const target = t('main.common.system_key.menu');

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
                width='60%'
            >
                {messageContextHolder}
                <FormBuilder.CreateNewMenuForm
                    form={createForm}
                    handleButtonSubmit={handleCreateSubmitClick}
                    handleButtonCancel={handleCreateCancelClick}
                />
            </Modal>
        </>
    );
}
