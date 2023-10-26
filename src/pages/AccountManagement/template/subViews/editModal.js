import { Modal } from 'antd';
import React from 'react';
import { FormBuilder } from '../../../../components/FormBuilder';

export default function EditModal({
    t,
    editForm,
    openEditModel,
    handleEditSubmitClick,
    handleEditCancelClick,
    messageContextHolder,
}) {
    const target = t('main.common.system_key.account');

    return (
        <>
            <Modal
                open={openEditModel}
                title={t('main.entities.form_edit_title', {
                    target: target,
                })}
                onCancel={handleEditCancelClick}
                maskClosable={false}
                footer={[]}
                centered
            >
                {messageContextHolder}
                <FormBuilder.EditAccountForm
                    form={editForm}
                    handleButtonSubmit={handleEditSubmitClick}
                    handleButtonCancel={handleEditCancelClick}
                />
            </Modal>
        </>
    );
}
