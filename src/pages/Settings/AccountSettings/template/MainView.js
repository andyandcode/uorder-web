import { Layout } from 'antd';
import { ButtonLocated } from '../../../../components/ButtonLocated';
import { FormBuilder } from '../../../../components/FormBuilder';
import ChangePasswordModal from './subViews/changePasswordModal';

const { Content } = Layout;

export default function MainView({
    t,
    editForm,
    messageContextHolder,
    cookieData,
    changePasswordForm,
    openChangePasswordModal,
    handleChangeSubmitClick,
    handleChangeCancelClick,
    handleChangePasswordClick,
    handleChangePasswordCancelClick,
}) {
    return (
        <>
            {cookieData.length > 0 ||
                (cookieData && (
                    <Content>
                        <FormBuilder.AccountSettingsForm form={editForm} data={cookieData} />
                        <ChangePasswordModal
                            t={t}
                            data={cookieData}
                            changePasswordForm={changePasswordForm}
                            openChangePasswordModal={openChangePasswordModal}
                            messageContextHolder={messageContextHolder}
                            handleChangeSubmitClick={handleChangeSubmitClick}
                            handleChangeCancelClick={handleChangeCancelClick}
                            handleChangePasswordCancelClick={handleChangePasswordCancelClick}
                        />
                        <ButtonLocated.ChangePasswordButton handleButton={handleChangePasswordClick} />
                    </Content>
                ))}
        </>
    );
}
