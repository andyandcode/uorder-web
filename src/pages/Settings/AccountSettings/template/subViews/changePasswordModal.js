import { Modal } from 'antd';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function ChangePasswordModal({
    t,
    changePasswordForm,
    openChangePasswordModal,
    messageContextHolder,
    handleChangeSubmitClick,
    handleChangeCancelClick,
    handleChangePasswordCancelClick,
    data,
}) {
    return (
        <>
            <Modal
                open={openChangePasswordModal}
                maskClosable={true}
                footer={[]}
                centered
                title={t('main.entities.form_change_password_title')}
                onCancel={handleChangePasswordCancelClick}
            >
                {messageContextHolder}
                <FormBuilder.ChangePasswordForm
                    data={data}
                    form={changePasswordForm}
                    handleButtonSubmit={handleChangeSubmitClick}
                    handleButtonCancel={handleChangeCancelClick}
                />
            </Modal>
        </>
    );
}
