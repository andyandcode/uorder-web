import { Modal } from 'antd';
import React from 'react';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function EditModal({
    t,
    editForm,
    openEditModel,
    handleEditSubmitClick,
    handleEditCancelClick,
    messageContextHolder,
    defaultFile,
}) {
    return (
        <>
            <Modal
                open={openEditModel}
                title={t('main.entities.form_edit_title', {
                    target: t('main.common.system_key.dish'),
                })}
                onCancel={handleEditCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='auto'
            >
                {messageContextHolder}
                <FormBuilder.EditDishForm
                    form={editForm}
                    handleButtonSubmit={handleEditSubmitClick}
                    handleButtonCancel={handleEditCancelClick}
                    defaultFile={defaultFile}
                />
            </Modal>
        </>
    );
}
