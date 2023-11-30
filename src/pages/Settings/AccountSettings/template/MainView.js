import { Button, Divider, Layout, Typography } from 'antd';
import { FormBuilder } from '../../../../components/FormBuilder';
import ChangePasswordModal from './subViews/changePasswordModal';

const { Content } = Layout;
const { Title } = Typography;

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
                        <Title style={{ marginBottom: 32 }} level={3}>
                            {t('main.navigation.settings.account')}
                        </Title>
                        <Divider style={{ marginTop: 60 }} />
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
                        <Button onClick={handleChangePasswordClick}>Change Password</Button>
                    </Content>
                ))}
        </>
    );
}
